export type Address = {
    name: string;
    phone: string;
    addressLine1:string;
    addressLine2?: string;
    cityLocality: string;
    stateProvince: string;
    postalCode: string;
    countryCode: string;
    addressResidentialIndicator: "yes" | "no";
  };

  export type unit = "ounce" | "gram" | "kilogram" | "pound";
export type dimensionUnit = "inch" | "centimeter";


  export type Package = {
    weight: {
      value: number;
      unit: unit;
    };
    dimensions: {
      height: number;
      width: number;
      length: number;
      unit: dimensionUnit;
    };
  };

  // Yeh aapke project ke types file mein ho sakta hai (e.g., types/ShippingTypes.ts)
// Agar aapka original ShippingAddress kuch is tarah hai:
export type ShippingAddress = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  cityLocality: string;
  stateProvince: string;
  postalCode: string;
  countryCode: string;
  addressResidentialIndicator: "yes" | "no"; // camelCase version
};

// Ab ExtendedShippingAddress me snake_case properties define karte hue:
export type ExtendedShippingAddress = ShippingAddress & {
  address_line1: string;
  address_line2: string;
  city_locality: string;
  state_province: string;
  postal_code: string;
  country_code: string;
  // Yahan type ko update kar dete hain:
  address_residential_indicator: "residential" | "commercial";
};
