import DateTimeNowUTC from '../datetime';

class Base {
  public date: Date;

  constructor() {
    this.date = DateTimeNowUTC();
  }

  public setChanges() {
    this.date = DateTimeNowUTC();
  }
}

export {Base};
