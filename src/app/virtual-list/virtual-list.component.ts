import { AfterViewInit, Component, computed, ElementRef, HostListener, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { fromEvent, Subscription, throttleTime } from 'rxjs';
import { ScrollEvent } from './types';

@Component({
  selector: 'app-virtual-list',
  standalone: true,
  imports: [],
  templateUrl: './virtual-list.component.html',
  styleUrl: './virtual-list.component.scss'
})
export class VirtualListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() data!: Array<number>;
  @Input() height!: number;
  @Input() itemHeight!: number;
  @ViewChild('scrollableelement') scrollableelement!: ElementRef;

  scroll$: Subscription = Subscription.EMPTY;
  startIndex = signal(0);
  marginTop = 0;
  endIndex = computed(
    () => this.startIndex() + Math.ceil(this.height / this.itemHeight)
  )

  innerHeight = computed(() => this.itemHeight * this.data.length);
  visiblePart: number[] = this.data?.slice(this.startIndex(), this.endIndex())

  setVisiblePart() {
    this.visiblePart = this.data?.slice(this.startIndex(), this.endIndex())
  }

  setIndex(event: ScrollEvent) {
    this.startIndex.set(event.target?.scrollTop / this.itemHeight | 0);
    this.setVisiblePart()
    this.marginTop = this.startIndex() * this.itemHeight
  }

  ngOnInit(): void {
    this.setVisiblePart()
  }

  ngAfterViewInit(): void {
    this.scroll$ = fromEvent(this.scrollableelement.nativeElement, 'scroll')
      .pipe(
        throttleTime(250)
      )
      .subscribe((event) => this.setIndex(event as ScrollEvent))
  }

  ngOnDestroy(): void {
    this.scroll$.unsubscribe()
  }
}
