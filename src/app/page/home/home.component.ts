import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { DetailGifService } from 'src/app/services/detail-gif.service';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewChecked {
  trendingGifs: any[] = [];
  searchQuery: string = '';
  isLoading: boolean = true;
  isSearch: boolean = false;
  limit: number = 40;
  subscription!: Subscription;

  constructor(
    private router: Router,
    private giphyService: GiphyService,
    private detailGifService: DetailGifService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.giphyService.getTrending(this.limit).subscribe({
      next: (res) => { this.trendingGifs = res },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          key: 'myToast',
          detail:
            "Couldn't get the trending Gifs, Please Hard Reload the browser",
          life: 5000,
        });
      }
    });
  }
    
  ngAfterViewChecked() {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  goDetail(id: any, item: any) {
    this.detailGifService.on(item);
    this.router.navigate(['/detail', id]);
  }

  search() {
    this.isSearch = true;
    if (this.searchQuery.trim() === '') {
      this.messageService.add({
        severity: 'warn',
        summary: 'Warning',
        key: 'myToast',
        detail: "Search box shouldn't be empty",
        life: 3000,
      });
    } else {
      this.isLoading = true;
      this.giphyService.search(this.searchQuery).subscribe({
        next: (res) => { this.trendingGifs = res; },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            key: 'myToast',
            detail: "Couldn't get the search result, Please try again",
            life: 5000,
          });
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

  // TODO: scroll down to take another 60 items
  // @HostListener("window:scroll", ["$event"])
  // onScroll() {
  //   if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
  //     // this.loadMoreGifs();
  //     this.addDynamicComponent();
  //   }
  // }

  // addDynamicComponent() {
  //   this.offset += this.limit;
  //   const componentFactory =
  //     this.componentFactoryResolver.resolveComponentFactory(ItemComponent);
  //   const componentRef =
  //     this.dynamicComponentContainer.createComponent(componentFactory);
  //   componentRef.instance.isSearch = this.isSearch;
  //   componentRef.instance.offset = this.offset;
  //   setTimeout(() => { });
  // }
}
