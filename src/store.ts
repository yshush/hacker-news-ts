import { NewsFeed, NewsStore } from './types'

export default class Store implements NewsStore {
  private feeds: NewsFeed[];
  private _currentPage: number;

  constructor() {
    this.feeds = [];
    this._currentPage = 1;
  }

  get currentPage() {
    return this._currentPage; // 내부에서만 쓰는 속성은 외부에서 쓰는 것과 이름이 같은 경우에 앞에 _를 붙여준다.
  }

  set currentPage(page: number) {
    this._currentPage = page;
  }

  get nextPage(): number {
    return this._currentPage < 3 ? this._currentPage + 1 : 3;
  }

  get prevPage(): number {
    return this._currentPage > 1 ? this._currentPage - 1 : 1;
  }

  // 피드가 전체가 몇개인지
  get numberOfFeed(): number {
    return this.feeds.length;
  }

  // 피드에 데이터가 있는지 없는지
  get hasFeeds(): boolean  {
    return this.feeds.length > 0;
  }

  // 전체 피드를 내보내주는 메소드
  getAllFeeds(): NewsFeed[] {
    return this.feeds;
  }

  // 피드 내 특정 위치에 있는 피드 하나를 꺼내오는 메소드
  getFeed(position: number): NewsFeed {
    return this.feeds[position];
  }

  setFeeds(feeds: NewsFeed[]): void {
    this.feeds = feeds.map(feed => ({
      ...feed,
      read: false
    }));
  }

  makeRead(id: number): void {
    const feed = this.feeds.find((feed: NewsFeed) => feed.id === id);

    if (feed) {
      feed.read = true;
    }
  }
}