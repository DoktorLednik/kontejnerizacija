import{$ as w,Aa as k,E as b,F as R,Q as B,S as I,U as x,_ as L,aa as E,ba as N,da as F,ea as T,ga as V,h as g,ia as P,j as _,ja as D,k as S,l as h,m as v,ma as O,na as j,o as a,oa as U,p as C,q as m,r as s,ra as q,s as r,sa as A,t as o,u as l,v as M,w as y,x as f,y as u,z as d}from"./chunk-P4AOUVWB.js";function et(e,t){e&1&&l(0,"mat-spinner")}function it(e,t){e&1&&(r(0,"mat-error"),d(1,"Please enter a valid e-mail."),o())}function nt(e,t){e&1&&(r(0,"mat-error"),d(1,"Please enter a valid password."),o())}function rt(e,t){e&1&&(r(0,"button",9),d(1,"Login"),o())}function ot(e,t){if(e&1){let c=M();r(0,"form",2,3),y("submit",function(){h(c);let n=u(1),p=f();return v(p.onLogin(n))}),r(2,"mat-form-field"),l(3,"input",4,5),s(5,it,2,0,"mat-error",0),o(),r(6,"mat-form-field"),l(7,"input",6,7),s(9,nt,2,0,"mat-error",0),o(),s(10,rt,2,0,"button",8),o()}if(e&2){let c=u(4),i=u(8),n=f();a(5),m("ngIf",c.invalid),a(4),m("ngIf",i.invalid),a(1),m("ngIf",!n.isLoading)}}var z=(()=>{let t=class t{constructor(i){this.authService=i,this.isLoading=!1}ngOnInit(){this.authStatusSub=this.authService.getAuthStatusListener().subscribe(i=>{this.isLoading=!1})}onLogin(i){i.invalid||(this.isLoading=!0,this.authService.login(i.value.email,i.value.password))}ngOnDestroy(){this.authStatusSub.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)(C(I))},t.\u0275cmp=_({type:t,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["loginForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-Mail Address","required","","email",""],["emailInput","ngModel"],["type","password","name","password","ngModel","","matInput","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-raised-button","","color","primary","type","submit",4,"ngIf"],["mat-raised-button","","color","primary","type","submit"]],template:function(n,p){n&1&&(r(0,"mat-card"),s(1,et,1,0,"mat-spinner",0)(2,ot,11,3,"form",1),o()),n&2&&(a(1),m("ngIf",p.isLoading),a(1),m("ngIf",!p.isLoading))},dependencies:[b,q,E,w,A,x,L,D,N,F,T,O,j,P,V],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]});let e=t;return e})();function at(e,t){e&1&&l(0,"mat-spinner")}function mt(e,t){e&1&&(r(0,"mat-error"),d(1,"Please enter a valid e-mail."),o())}function st(e,t){e&1&&(r(0,"mat-error"),d(1,"Please enter a valid password."),o())}function pt(e,t){e&1&&(r(0,"button",9),d(1,"Signup"),o())}function lt(e,t){if(e&1){let c=M();r(0,"form",2,3),y("submit",function(){h(c);let n=u(1),p=f();return v(p.onSignup(n))}),r(2,"mat-form-field"),l(3,"input",4,5),s(5,mt,2,0,"mat-error",0),o(),r(6,"mat-form-field"),l(7,"input",6,7),s(9,st,2,0,"mat-error",0),o(),s(10,pt,2,0,"button",8),o()}if(e&2){let c=u(4),i=u(8),n=f();a(5),m("ngIf",c.invalid),a(4),m("ngIf",i.invalid),a(1),m("ngIf",!n.isLoading)}}var H=(()=>{let t=class t{constructor(i){this.authService=i,this.isLoading=!1}ngOnInit(){this.authStatusSub=this.authService.getAuthStatusListener().subscribe(i=>{this.isLoading=!1})}onSignup(i){i.invalid||(this.isLoading=!0,this.authService.createUser(i.value.email,i.value.password))}ngOnDestroy(){this.authStatusSub.unsubscribe()}};t.\u0275fac=function(n){return new(n||t)(C(I))},t.\u0275cmp=_({type:t,selectors:[["ng-component"]],decls:3,vars:2,consts:[[4,"ngIf"],[3,"submit",4,"ngIf"],[3,"submit"],["signupForm","ngForm"],["matInput","","name","email","ngModel","","type","email","placeholder","E-Mail Address","required","","email",""],["emailInput","ngModel"],["type","password","name","password","ngModel","","matInput","","placeholder","Password","required",""],["passwordInput","ngModel"],["mat-raised-button","","color","primary","type","submit",4,"ngIf"],["mat-raised-button","","color","primary","type","submit"]],template:function(n,p){n&1&&(r(0,"mat-card"),s(1,at,1,0,"mat-spinner",0)(2,lt,11,3,"form",1),o()),n&2&&(a(1),m("ngIf",p.isLoading),a(1),m("ngIf",!p.isLoading))},dependencies:[b,q,E,w,A,x,L,D,N,F,T,O,j,P,V],styles:["mat-form-field[_ngcontent-%COMP%]{width:100%}mat-spinner[_ngcontent-%COMP%]{margin:auto}"]});let e=t;return e})();var ut=[{path:"login",component:z},{path:"signup",component:H}],J=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=S({type:t}),t.\u0275inj=g({imports:[B.forChild(ut),B]});let e=t;return e})();var Lt=(()=>{let t=class t{};t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=S({type:t}),t.\u0275inj=g({imports:[R,k,U,J]});let e=t;return e})();export{Lt as AuthModule};
