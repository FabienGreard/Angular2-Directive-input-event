# Angular2-Directive-input-event
Handle event on input

#How To use
<div [isActive]="'search-active'" [isKeyDesactive]="'13'" [isKeyActive]="'38'" [selectMethod]="'add'" [isFocus]="'search'" [cleanInput]="'search'" class="app-search">
will toggle class "search-active" with a focus on class search and clean it ( it's an input of type text) it also add 2 shortcuts on active and close (wich are enter(13) and &(38))

# include on your component buttons.directive.ts 

import { isActiveDirective } from '../directives/buttons.directives';
@Component({
  selector: 'dashboard',
  templateUrl: '../../html/dashboard.html',
  providers: [AuthenticationService, AnimationService],
  directives: [isActiveDirective]
})

# Directives 

[isActive], [haveChildrens], [haveChildrensClass], [selectMethod], [cleanInput], [isFocus], [isKeyActive], [isKeyDesactive], [isExeption]

