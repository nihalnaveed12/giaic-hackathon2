import { Address, ExtendedShippingAddress, ShippingAddress } from "@/types/ShippingTypes";

// Define a type that extends the original ShippingAddress with snake_case keys
export function formatAddressForShipEngine(address: Address) {
    return {
      name: address.name,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      cityLocality: address.cityLocality,
      stateProvince: address.stateProvince,
      postalCode: address.postalCode,
      countryCode: address.countryCode,
      addressResidentialIndicator: address.addressResidentialIndicator?.toLowerCase() === "yes" ? "yes" : "no",
    };
  }
  