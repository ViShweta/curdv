import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LocalStorageService } from '../local-storage.service';
import { ItemReorderEventDetail } from '@ionic/angular';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  userlist: any = [];
  userData: any = [];
  getdata: any;
  username: any;
  results: any;
  dataRefresher: any;

  constructor(
    public localStorageService: LocalStorageService,
    private alertCtrl: AlertController,
    private service: ServiceNameService,
  ) { }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // console.log('Before complete', this.results);
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
    // this.results = ev.detail.complete(this.results);
    // console.log('After complete', this.results);
  }


  handleChange(event: any) {

    if (this.results != null) {
      const query = event.target.value.toString().toLowerCase();
      this.results = this.userlist.filter((d: any) => d.userName.toLowerCase().indexOf(query) > -1);
      console.log("search:", this.results.length);
      if (this.results.length <= 0) {
        this.service.presentAlert("data not found!");
      }
    }
  }

  ionViewWillEnter() {
    this.Viewall();
  }

  ngOnInit() {
    this.Viewall();
  }

  Viewall() {
    this.userlist = JSON.parse(this.localStorageService.getData('userList') as any);
    this.results = [...this.userlist]
    console.log("data", this.userlist)
  }

  async clearData(index: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: "Are you sure want to delete this user?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            this.alertCtrl.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.userlist.splice(index, 1);
            console.log(this.userlist);
            this.localStorageService.saveData("userList", this.userlist)
          },
        },
      ],
    });
    await alert.present();
  }

}
