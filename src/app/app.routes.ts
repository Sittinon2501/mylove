import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path:'story',
        component: StoryComponent
    }

];
