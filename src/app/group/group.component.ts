import { Component, OnInit } from '@angular/core';
import { Group,GroupsWithUser } from '../shared/group';
import { FormGroup, FormControl } from  "@angular/forms";
import { Router ,ActivatedRoute } from '@angular/router';
import  {GroupService} from '../services/group/group.service';
import { UserService } from "../services/user/user.service";
import { User } from '../shared/user';


@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupForm :FormGroup;

  pageTitle: string = "Groups";

  loggedInUserID:number =1;

  infoMessage: string = "";

  errorMessage:string ="";

  group:Group;

  search:string = "";

  user: User =  {"id":1,"name":"karis","email":"karis@mailinator.com","imageUrl":null,"emailVerified":false};


  switchForm: boolean = false;

  groupId:number ;

  edit: boolean = false;

  groups: Group[] =[];


  constructor(private router: Router, 
    private route :ActivatedRoute,
    private groupService :GroupService,
    private userService:UserService ) { 
    this.groups = [];
    this.fetchGroups();
  }

  // ngOnInit(): void {
  //   this.groupForm = new FormGroup({
  //     name:new FormControl(),
  //     description:new FormControl(),
  //   });
  //   const resolvedData: GroupsWithUser = this.route.snapshot.data['resolvedData'];
  //   if (resolvedData) {
  //     this.groups =resolvedData.groups;
  //     this.user =resolvedData.user;
  //   }
    
  // }

  ngOnInit(): void {
    this.groupForm = new FormGroup({
      name:new FormControl(),
      description:new FormControl(),
    });
    const resolvedData:Group[] = this.route.snapshot.data['resolvedData'];
    if (resolvedData) {
      if (localStorage.getItem('u')) {
        let user = JSON.parse(localStorage.getItem('u'));
        this.user = user;
      }
      this.groups =resolvedData;
      // this.user =resolvedData.user;
    }
    
  }

  // fetchGroups(): void{
  //   this.groupService.getGroups().subscribe({
  //     next:data =>{
  //       this.groups = data.groups;
  //       this.user=data.user;
  //     },
  //     error:err=>this.errorMessage = err
  //   });
  // }
  fetchGroups(): void{
    this.groupService.getGroups().subscribe({
      next:data =>{
        this.groups = data;
      },
      error:err=>this.errorMessage = err
    });
  }

  saveGroup():void{
    const g ={...this.group, ...this.groupForm.value};
    console.info("g", g);
    if (this.edit) {
      // Edit group
      this.groupService.updateGroup(g).subscribe({
        next:()=>this.clearForm(),
        error:err=>this.infoMessage=err
      })
    }else{
      // Create group
      this.groupService.createGroup(g).subscribe({
        next:()=>this.clearForm(),
        error:err=>this.infoMessage=err
      })
    }

  }

  clearForm():void{
    setTimeout(()=>{
      this.groupForm.reset();
      this.pageTitle = "Groups";
      if (this.edit) {
        this.switchForm=false;
        this.edit =false;
      }
      this.infoMessage = "";
      this.fetchGroups();
    },1000);
  }


  switchData() :void{
    this.edit =false;
    this.pageTitle = "Groups" ;
    if (this.switchData) {
      this.fetchGroups();
    }
    this.switchForm=!this.switchForm;
  }

  deleteGroup(id:number):void {
    if (confirm("Are you sure you want to delete group")) {
        this.groupService.deleteGroup(id)
          .subscribe({
            next: () => this.fetchGroups(),
            error: err => this.errorMessage = err
          });
    }
  }


  getGroup(id: number): void {
    this.groupService.getGroup(id)
      .subscribe({
        next: (group: Group) => this.displayGroup(group),
        error: err => this.errorMessage = err
      });
  }

  displayGroup(group:Group): void{

    if (this.groupForm) {
      this.groupForm.reset();
    }
    this.group = group; 
    
    this.edit = true;

    this.groupForm.setValue({
      name:group.name,
      description:group.description
    });

    this.groupId =group.id;

    this.pageTitle = "Edit Group";
    this.switchForm =true;
  }

  searchGroup(): void{
    console.log(this.search);

    // this.groups=this.groupService.groups;
    // if (this.search.trim() === "") {
    //   this.groups=this.groupService.groups;
    // }else{
    //   this.groups = this.groups.filter((group:Group)=>group.name.toLocaleLowerCase().indexOf(this.search)!==-1);
    // }

  }

  joinGroup(id:number):void{
    console.log(id);
  }


}
