
import HomePage from '../pages/home.f7';
import AboutPage from '../pages/about.f7';
import FormPage from '../pages/form.f7';
import Golpeaaltopo from '../pages/golpeaaltopo.f7.html';
import Tictactoe from '../pages/tictactoe.f7.html';
import Memoria from '../pages/memoria.f7.html';


import DynamicRoutePage from '../pages/dynamic-route.f7';
import RequestAndLoad from '../pages/request-and-load.f7';
import NotFoundPage from '../pages/404.f7';

var routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/about/',
    component: AboutPage,
  },
  {
    path: '/form/',
    component: FormPage,
  },

  {
    path: '/tictactoe/',
    component: Tictactoe,
  },

  {
    path: '/golpeaaltopo/',
    component: Golpeaaltopo,
  },

  {
    path: '/memoria/',
    component: Memoria,
  },

  {
    path: '/dynamic-route/blog/:blogId/post/:postId/',
    component: DynamicRoutePage,
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function ({ router, to, resolve }) {
      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = to.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Detrás de cada gran App existen talentosos creadores que trabajan arduamente para brindarte experiencias únicas. Explora nuestros perfiles detallados para conocer el proceso creativo y logros. Descubre la pasión y dedicación que hay detrás de esta App y conéctate con las personas que dan vida a tus aventuras virtuales. \n CONOCE MAS DE NOSOTROS ❤️',
          links: [
            {
              title: '🎉Javier Santamaria "GitHub"🎉',
              url: 'https://github.com/Javier-Santamaria/',
            },
            {
              title: '💡Juan Carlos Lozano "GitHub"💡',
              url: 'https://github.com/juancarlos5623/',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            component: RequestAndLoad,
          },
          {
            props: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];

export default routes;