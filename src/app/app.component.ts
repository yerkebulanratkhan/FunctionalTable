import {Component, OnInit, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as data from "../assets/data"
import {MatSort, Sort} from '@angular/material/sort';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {BlockUI, BlockUIModule, NgBlockUI} from "ng-block-ui";

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    MatSort,
    FormsModule,
    NgbPagination,
    RouterOutlet,
    NgForOf,
    NgIf,
    BlockUIModule,
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  @BlockUI() blockUI: NgBlockUI | undefined;
  title = 'FunctionalTable';
  allData: any[] = [];
  filteredData: any[] = [];
  displayedData: any[] = [];
  params = {
    search: '',
    page: 1,
    pageSize: 10
  }

  pageSizes: number[] = [10,20,30,50];
  displayedColumns: any[] = [
    {id: 'name', show: true},
    {id: 'email', show: true},
    {id: 'balance', show: true},
    {id: 'age', show: true},
    {id: 'company', show: true},
    {id: 'address', show: true},
    {id: 'favoriteFruit', show: true},
    {id: 'tags', show: true},
    {id: 'isActive', show: true}
  ]
  constructor() {
  }

  @ViewChild(MatSort) sort: MatSort | undefined;

  ngOnInit() {
    this.blockUI?.start('Loading...');
    this.filteredData = this.allData
    this.searchChange();
    setTimeout(() => {
      this.allData = data.default.slice();
      this.filteredData = this.allData;
      this.pageChange();
      this.blockUI?.stop();
    }, Math.floor(Math.random() * 3000) + 1000);
  }

  searchChange() {
    this.filteredData = this.allData.filter(record => record.email && record.email.includes(this.params.search)
        || (record.name && record.name.first && record.name.first.includes(this.params.search))
        || (record.name && record.name.last && record.name.last.includes(this.params.search))
        || (record.balance && record.balance.includes(this.params.search))
        || (record.age && (record.age+'').includes(this.params.search))
        || (record.company && record.company.includes(this.params.search))
        || (record.address && record.address.includes(this.params.search))
        || (record.favoriteFruit && record.favoriteFruit.includes(this.params.search))
        || (record.tags && record.tags.some((tag: string)=>tag.includes(this.params.search))));
    this.pageChange();
  }

  pageChange() {
    this.displayedData = this.filteredData.slice(((this.params.page-1)*this.params.pageSize), ((this.params.page-1)*this.params.pageSize)+this.params.pageSize);
  }

  columnDisplayed(id: string) {
    return this.displayedColumns.some(c=>c.id == id && c.show)
  }

  sortData(sort: Sort) {
    this.params.page = 1;
    const data = this.filteredData.slice(((this.params.page-1)*this.params.pageSize), ((this.params.page-1)*this.params.pageSize)+this.params.pageSize);
    if (!sort.active || sort.direction === '') {
      this.displayedData = data;
      return;
    }

    this.displayedData = this.filteredData.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      return compare(a[sort.active], b[sort.active], isAsc);
    }).slice(((this.params.page-1)*this.params.pageSize), ((this.params.page-1)*this.params.pageSize)+this.params.pageSize);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
