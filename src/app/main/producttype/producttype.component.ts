import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ProducttypeService } from './producttype.service';
import { LoaiSanPham } from './loaisanpham';

@Component({
  selector: 'app-producttype',
  templateUrl: './producttype.component.html',
  styleUrls: ['./producttype.component.css'],
})
export class ProducttypeComponent implements OnInit {
  [x: string]: any;

  @ViewChild('AddandEdit', { static: false }) public AddandEdit: ModalDirective;
  @ViewChild('editAndADD1', { static: false }) editAndADD1: ModalDirective;
  constructor(private producttypeService: ProducttypeService) {}

  public entity: any;
  public entity1: any;
  public items: any[];
  public id: number;
  public checkedid: any;
  public keyword: string;
  ngOnInit(): void {
    this.loadData();
  }
  loadData() {
    this.producttypeService.getList().subscribe((res: any) => {
      this.items = res;
      console.log(this.items);
    });
  }
  showAdd() {
    this.entity = {};
    this.checkedid = 0;
    this.AddandEdit.show();
  }
  showEdit(id: number) {
    this.checkedid = 1;
    this.producttypeService.GetSingle(id).subscribe((res) => {
      this.entity = res;
    });
    this.AddandEdit.show();
  }
  showDetail(id: number) {
    this.checkedid = 1;
    this.producttypeService.GetSingle(id).subscribe((res) => {
      this.entity1 = res;
    });
    this.editAndADD1.show();
  }
  SaveForm(values: any) {
    console.log(values);
    if (this.checkedid == 0) {
      this.producttypeService.postItme(values).subscribe((res) => {
        alert('Do you want add this item?');
        this.loadData();
        this.AddandEdit.hide();
      });
    } else {
      console.log(values.id);
      this.producttypeService.editItem(values.id, values).subscribe((res) => {
        alert('Are you sure edit this item?');
        this.loadData();
        this.AddandEdit.hide();
      });
    }
  }
  deleteShow(id: any) {
    if (confirm('Are you sure delete this item?')) {
      this.producttypeService.deleteItem(id).subscribe((res) => {
        this.loadData();
      });
    }
  }
  // Search() {
  //   this.typenewService.Search(this.keyword).subscribe(
  //     (response: any) => {
  //       this.employees = response;
  //       console.log(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  searchTitle(): void {
    this.producttypeService.findByTitle(this.title).subscribe(
      (data) => {
        this.tutorials = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
