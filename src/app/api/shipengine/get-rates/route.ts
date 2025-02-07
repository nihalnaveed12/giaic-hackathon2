import { shipEngine } from "@/lib/helper/shipEngine"; // Import ShipEngine client
import { Address, Package } from "@/types/ShippingTypes"; // Import custom types
import { NextRequest } from "next/server";



export async function POST(req: NextRequest) {
  try {
    const {
      shipeToAddress,
      packages,
    }: { shipeToAddress: Address; packages: Package[] } = await req.json();


    // Validate required fields in shipeToAddress
    if (
      !shipeToAddress?.name ||
      !shipeToAddress?.phone ||
      !shipeToAddress?.addressLine1 ||
      !shipeToAddress?.cityLocality ||
      !shipeToAddress?.stateProvince ||
      !shipeToAddress?.postalCode ||
      !shipeToAddress?.countryCode
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields in shipeToAddress" }),
        { status: 400 }
      );
    }

    // Validate packages
    if (!packages?.length) {
      return new Response(
        JSON.stringify({ error: "At least one package is required" }),
        { status: 400 }
      );
    }

    // Define the "ship from" address
    const shipFromAddress: Address = {
      name: "Michael Smith",
      phone: "+1 555 987 6543",
      addressLine1: "456 Oak Avenue",
      addressLine2: "Suite 200",
      cityLocality: "Los Angeles",
      stateProvince: "CA",
      postalCode: "90001",
      countryCode: "US",
      addressResidentialIndicator: "no", // Commercial address
    };
    try {
      const shipmentDetails = await shipEngine.getRatesWithShipmentDetails({
        shipment: {
          shipTo: shipeToAddress,
          shipFrom: shipFromAddress,
          packages: packages,
        },
        rateOptions: {
          carrierIds: [
            process.env.SHIPENGINE_FIRST_COURIER || "",
            process.env.SHIPENGINE_SECOND_COURIER || "",
            process.env.SHIPENGINE_THIRD_COURIER || "",
            process.env.SHIPENGINE_FOURTH_COURIER || "",
          ].filter(Boolean),
        },
      });

     

      const rates = shipmentDetails.rateResponse.rates;
      if (!rates?.length) {
        return new Response(
          JSON.stringify({
            error: "No rates found for the given shipment details",
          }),
          { status: 404 }
        );
      }

      console.log(rates)

      return new Response(JSON.stringify({ rates }), { status: 200 });
    } catch (error) {
        console.log(error)
      return new Response(
        JSON.stringify({
          error: "Failed to fetch shipping rates. Please check the input data.",
        }),
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Server Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
