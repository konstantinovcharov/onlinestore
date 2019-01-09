import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { from } from 'rxjs';
import { BackendService } from './../../services/backend.service';


@Component({
  selector: 'adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit, OnDestroy {

  toggleField: string;
  dataSource: MatTableDataSource<any>;
  members: any[];
  myDocData: any;

  savedChanges = false;
  error: boolean = false;
  errorMessage: String = "";
  dataLoading: boolean = false;
  private querySubscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];


  constructor(private _backendService: BackendService) { }

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
    this.querySubscription = this._backendService.getDocs('user')
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
    this.querySubscription = this._backendService.getFilterProducts('user', filters)
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
    this.querySubscription = this._backendService.setDocs('user', formData)
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
    this.querySubscription = this._backendService.updateDocs('user', formData)
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
    this.querySubscription = this._backendService.getOneDoc('user', docId)
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
      this.querySubscription = this._backendService.delOneDoc('user', docId)
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
