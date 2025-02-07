import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    h4: ({ children }) => (
      <h4 className="text-[24px] pb-1 text-[#151875] font-semibold">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-dark dark:text-light font-josifen font-semibold text-[16px] pb-2 text-[#A9ACC6]">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-4xl pb-2 font-bold ">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl pb-2 font-bold ">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl pb-2 font-bold ">{children}</h3>
    ),
    h5: ({ children }) => (
      <h5 className="text-xl pb-2 font-bold ">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-lg pb-2 text-[#151875] font-semibold">{children}</h6>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc list-inside ml-4 mt-2">
        {children}
      </li>
    ),
    number: ({ children }) => (
      <li className="list-decimal marker:text-accentDarkSecondary list-inside ml-4 pb-4 font-josifen font-semibold text-[16px]  text-[#A9ACC6]">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-dark dark:text-white ">{children}</strong>
    ),
  },
};