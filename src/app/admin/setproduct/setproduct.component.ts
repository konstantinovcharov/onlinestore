import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { from, Observable } from 'rxjs';
import { BackendService } from './../../services/backend.service';
import { AngularFireStorage } from '@angular/fire/storage';


@Component({
  selector: 'setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {

  toggleField: string;
  dataSource: MatTableDataSource<any>;
  members: any[];
  myDocData: any;

  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;

  profileUrl: Observable<string | null>
  takeHostSelfie = false;
  showHostSelfie = false;
  myDocId;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];


  constructor(private _backendService: BackendService, private _storage: AngularFireStorage) { }

  ngOnInit() {
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  toggle(filter?) {
    if (!filter) { filter = "searchMode" }
    else { filter = filter; }
    this.toggleField = filter;
  }

  getData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getDocs('product')
      .subscribe(members => {
        this.members = members;
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => { this.error = false; this.dataLoading = false; });

  }

  getFilteredData(filters) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getFilterProducts('product', filters)
      .subscribe(members => {
        this.members = members;
        this.dataSource = new MatTableDataSource(members);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataLoading = false;
      },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => { this.error = false; this.dataLoading = false; });

  }

  setData(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.setDocs('product', formData)
      .then((res) => {
        this.savedChanges = true;
        this.dataLoading = false;
      }).catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      });

  }

  updateData(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.updateDocs('product', formData)
      .then((res) => {
        this.savedChanges = true;
        this.dataLoading = false;
      }).catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      });

  }

  getDoc(docId) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getOneDoc('product', docId)
      .subscribe(res => {
        if (res) {
          this.myDocData = res;
          this.toggle('editMode');
          this.dataLoading = false;
        }
      },
        (error) => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false;
        },
        () => { this.error = false; this.dataLoading = false; });
  }

  deleteDoc(docId) {
    if (confirm("Are you sure you want to delete this record ?")) {
      this.dataLoading = true;
      this.querySubscription = this._backendService.delOneDoc('product', docId)
        .then((res) => {
          this.toggle('searchMode');
          this.dataLoading = false;
        }).catch(error => {
          this.error = true;
          this.errorMessage = error.message;
          this.dataLoading = false; 
        });

    }
  }

  // pic functions

  getPic(picId) {
    const ref = this._storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }

  deleteProductPic(docId){
    if (confirm("Are you sure you want to delete this picture ? ")) {
      this._backendService.deleteProductPic('product',docId);
    }
  }


  // function for data table -result view



  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}
