import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MessageContainerComponent } from "./components/message/message-container.component";
import { MessageComponent } from "./components/message/message.component";

@NgModule({
  declarations: [
    MessageComponent,
    MessageContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MessageComponent,
    MessageContainerComponent,
  ]
})
export class SharedModule { }