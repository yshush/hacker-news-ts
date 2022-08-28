export default abstract class View {
  private template: string;
  private renderTemplate: string;
  private container: HTMLElement;
  private htmlList: string[];

  constructor(containerId: string, template: string) {
    const containerElement = document.getElementById(containerId);

    if (!containerElement) {
      throw '최상위 컨테이너가 없어 UI를 진행하지 못합니다.';
    }
    this.container = containerElement;
    this.template = template;
    this.renderTemplate = template;
    this.htmlList = [];
  }

  protected updateView(): void {
    this.container.innerHTML = this.renderTemplate;
    this.renderTemplate = this.template;
  }

  protected addHtml(htmlString: string): void {
    this.htmlList.push(htmlString);
  }

  protected getHtml(): string {
    const snapshot = this.htmlList.join('');
    this.clearHtmlList();
    return snapshot;
  }

  // 기존에 template 원본은 유지하고 있어야 계속된 업데이트에서도 새로운 데이터로 업데이트를 할 수 있기 때문에 생성자에서
  // update 받은 부분을 그대로 replace 해버리면 안된다 그래서 원본은 그대로 따로 내부적으로 저장하고, 데이터를 바꿀 때만 key를
  // 바꾸는 형태가 되야한다. - > template에 원본을 저장하고 renderTemplate가 데이터를 바꾸는 역할을 한다.
  protected setTemplateData(key: string, value: string): void {
    this.renderTemplate = this.renderTemplate.replace(`{{__${key}__}}`, value);
  }

  private clearHtmlList(): void {
    this.htmlList = [];
  }

  abstract render(): void;
}