import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'accountFrontEnd';
  username = ""
  password = ""

  exchangeRate ={
    "id": null,
    "originId":null,
    "foreignId":null,
    "rate":null
  };

  jwt =""
  rate = ""

  currencys =[]
  
  origin = {
    "id": null,
    "symbol": null
  }
  
  foreign = {
    "id": null,
    "symbol": null
  }
  
  originS = ""
  foreignS = ""

  amount = 100
  exchangeAmount

  BLogin      :boolean = true
  BExchange   :boolean = false
  BModify     :boolean = false

  constructor(
    public accountService : AccountService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }
  

  verificar(){
    
    this.accountService.getExchangerateByoriginIdAndforeignId( this.origin.id ,this.foreign.id).subscribe(
      result=>{
        console.log(result)
        if( !result )
          this.exchangeRate ={
            "id": null,
            "originId":null,
            "foreignId":null,
            "rate":"No hay"
          }
        else
          this.exchangeRate = result;
      },
      error=>{
        console.log(error)
      });
  }

  login(){

    let login =
      {
        "username": this.username,
        "password": this.password
      };

    this.accountService.postLogin(login).subscribe(
      result=>{
        console.log(result)
        
        if(result!==null)
        {
          this.jwt        = result.jwt
          localStorage.setItem('token',result.jwt)
          this.BLogin     = false
          this.BExchange  = true
          this.BModify    = true

          this.accountService.getCurrency().subscribe(
            result=>{
              console.log(result)
              this.currencys = result;
            },
            error=>{
              console.log(error)
            }
          );

        }else{
          alert("No UserName or Password was found!!");
        }
        
      },
      error=>{
        console.log(error)
      }
    );
  }
  
  dataChanged(){

    var exchange={
      "amount":this.amount,
      "originCurrency": this.origin.symbol,
      "foreignCurrency":this.foreign.symbol
    }
    this.accountService.postExchange(exchange).subscribe( 
      result=>{
        this.exchangeAmount = result.amountExchange;
      console.log( result )

      },
      error=>{
        this.exchangeAmount = "No hay"
        console.log(error)
      });
    //this.exchangeAmount = this.amount* this.exchangeRate.rate;
  }

  save(){
    this.accountService.postExchangerate(this.exchangeRate).subscribe(
      result=>{

        console.log(!result )

        if( !result )
          this.exchangeRate ={
            "id": null,
            "originId":null,
            "foreignId":null,
            "rate":"No hay"
          }
        else{
          this.exchangeRate = result;
          window.alert("successfully!");

        }
  
      },
      error=>{
        this.exchangeRate ={
          "id": null,
          "originId":null,
          "foreignId":null,
          "rate":"No hay"
        }
        console.log(error)
      }
    );
  }

  logout(){
    window.location.reload();
  }
}
