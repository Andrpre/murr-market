export const myTheme = {
  token: {
    fontFamily: "Comfortaa, sans-serif",
    colorLink: "var(--main-color)",
    colorPrimary: "var(--main-color)",
    colorPrimaryHover: "var(--main-color-hover)",
  },
  components: {
    Tabs: {
      inkBarColor: "var(--main-color)",
      itemActiveColor: "var(--main-color)",
      itemHoverColor: "var(--secondary-text-color)",
      itemSelectedColor: "var(--main-color)",
      titleFontSize: 16,
    },
    Input: {
        paddingBlockLG: 15,
        paddingInlineLG: 20,
        borderRadiusLG: 20,
        lineWidth: 3,
        colorPrimaryBg: "#555",
    },
    Radio: {
        dotSize: 10,
        radioSize: 20,
        fontSize: 16,
    },
    Button: {
        contentFontSize: 16,
        paddingBlock: 20,
        paddingInline: 30,
        borderRadius: 10,
        primaryShadow: "none",
        borderColorDisabled: "none",
        colorBgContainerDisabled: "var(--disabled-color)",
        colorTextDisabled: "var(--secondary-text-color)",
        controlHeight: 60,
    },
  },
};
