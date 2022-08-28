import { RouteInfo } from '../types';
import View from './view';

export default class Router {
  routeTable: RouteInfo[];
  defaultRoute: RouteInfo | null;

  constructor() {
    window.addEventListener('hashchange', this.route.bind(this)); // 현재 이 등록 시점의 this context로 고정시키기 위해 bind(this)를 해야한다.

    this.routeTable = [];
    this.defaultRoute =  null;
  }

  setDefaultPage(page: View): void{
    this.defaultRoute = { path: '', page };
  };
  addRoutePath(path: string, page: View): void {
    this.routeTable.push({ path, page });
  }

  route() {
    const routePath = location.hash;

    if (routePath === '' && this.defaultRoute) {
      this.defaultRoute.page.render();
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        routeInfo.page.render();
        break;
      }
    }
  }
}
