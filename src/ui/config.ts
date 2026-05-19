export default class UiConfig {


  static colors = {
    button: {
      normalTextColor: '#ffffff',
      pressedTextColor: '#dddddd',
      textStroke: '#066406'
    } as const,
    text: {
      color: '#ffffff',
      stroke: '#000000',
    },
    popup: {
      text: '#d9bb71',
    }
  } as const;

  static textStyle = {
    button: {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: UiConfig.colors.button.normalTextColor,
      stroke: UiConfig.colors.button.textStroke,
      strokeThickness: 4,
      padding: 16,
    } as const,

    label: {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: UiConfig.colors.text.color,
      stroke: UiConfig.colors.text.stroke,
      strokeThickness: 6,
      padding: 16,
    } as const,

    popup: {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: UiConfig.colors.popup.text,
      padding: 16,
    } as const,
  } as const;
}
