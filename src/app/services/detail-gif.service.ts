import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailGifService {
  public gifItemStore: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  constructor() { }
  
  on(event: any) {
    this.gifItemStore.next(event);
    localStorage.setItem('gif-item', JSON.stringify(event));
  }
}
