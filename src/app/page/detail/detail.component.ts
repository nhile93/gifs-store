import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailGifService } from 'src/app/services/detail-gif.service';
import dayjs from 'dayjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, AfterViewChecked, OnDestroy {
  gifItem: any;
  isLoading: boolean = true;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private detailGifService: DetailGifService
  ) { }

  ngOnInit() {
    this.subscription = this.detailGifService.gifItemStore.subscribe(
      (res: any) => {
        const storageItem: any = localStorage.getItem('gif-item');
        this.gifItem = res != undefined ? res : JSON.parse(storageItem);
      }
    );
  }

  goBack() {
    this.router.navigate(['']);
  }

  convertDate(event: any) {
    return dayjs(event).format('MM/DD/YYYY');
  }

  convertSize(bytes: any) {
    if (bytes < 1024) {
      return bytes + ' Bytes';
    } else if (bytes < 1048576) {
      return Math.round(bytes / 1024) + ' KB';
    } else if (bytes < 1073741824) {
      return (bytes / 1048576).toFixed(2) + ' MB';
    } else {
      return (bytes / 1073741824).toFixed(2) + ' GB';
    }
  }

  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
