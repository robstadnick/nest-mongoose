import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
    {
        title: 'My Garage',
        icon: 'home-outline',
        link: '/home',
    },
    {
        title: 'Shop',
        icon: 'shopping-cart-outline',
        link: '/home',
        home: true,
    },
    {
        title: 'FEATURES',
        group: true,
    },
    {
        title: 'Daily Programming',
        icon: 'layout-outline',
        children: [
            {
                title: 'Program A',
                link: '/home/layout/stepper',
            },
            {
                title: 'Program B',
                link: '/home/layout/list',
            },
            {
                title: 'Program C',
                link: '/home/layout/infinite-list',
            },
            {
                title: 'SHIFT',
                link: '/home/layout/accordion',
            },
            {
                title: 'Timer',
                pathMatch: 'prefix',
                link: '/home/layout/tabs',
            },
        ],
    },
    {
        title: 'Accessory Workouts',
        icon: 'edit-2-outline',
        children: [
            {
                title: 'Suns Out Guns Out',
                link: '/home/forms/inputs',
            },
            {
                title: 'OLY',
                link: '/home/forms/layouts',
            },
            {
                title: 'Power',
                link: '/home/forms/buttons',
            },
            {
                title: 'Butts & Gutts',
                link: '/home/forms/datepicker',
            },
            {
                title: 'Gymnastics',
                link: '/home/forms/datepicker',
            },
            {
                title: 'Endurance',
                link: '/home/forms/datepicker',
            },
        ],
    },
    {
      title: 'Movement Library',
      icon: 'pie-chart-outline',
      children: [
        {
          title: 'Echarts',
          link: '/home/charts/echarts',
        },
        {
          title: 'Charts.js',
          link: '/home/charts/chartjs',
        },
        {
          title: 'D3',
          link: '/home/charts/d3',
        },
      ],
    },
    {
        title: 'Nutrition',
        icon: 'keypad-outline',
        link: '/home/ui-features',
        children: [
            {
                title: 'My Nutrition',
                link: '/home/ui-features/grid',
            },
            {
                title: 'Challenges',
                link: '/home/ui-features/icons',
            },
            {
                title: 'Recipes',
                link: '/home/ui-features/icons',
            },
            {
                title: 'Tips',
                link: '/home/ui-features/typography',
            },
            {
                title: 'My Coach',
                link: '/home/ui-features/search-fields',
            },
        ],
    },
    {
        title: 'Vlogs',
        icon: 'browser-outline',
        children: [
            {
                title: 'Blogs',
                link: '/home/modal-overlays/dialog',
            },
            {
                title: 'Window',
                link: '/home/modal-overlays/window',
            },
            {
                title: 'Popover',
                link: '/home/modal-overlays/popover',
            },
            {
                title: 'Toastr',
                link: '/home/modal-overlays/toastr',
            },
            {
                title: 'Tooltip',
                link: '/home/modal-overlays/tooltip',
            },
        ],
    },
    {
        title: 'Profile',
        icon: 'message-circle-outline',
        children: [
            {
                title: 'Calendar',
                link: '/home/extra-components/calendar',
            },
            {
                title: 'Progress Bar',
                link: '/home/extra-components/progress-bar',
            },
            {
                title: 'Spinner',
                link: '/home/extra-components/spinner',
            },
            {
                title: 'Alert',
                link: '/home/extra-components/alert',
            },
            {
                title: 'Calendar Kit',
                link: '/home/extra-components/calendar-kit',
            },
            {
                title: 'Chat',
                link: '/home/extra-components/chat',
            },
        ],
    },
    {
      title: 'SP Family',
      icon: 'map-outline',
      children: [
        {
          title: 'Gyms',
          link: '/home/maps/gmaps',
        },
        {
          title: 'Garages',
          link: '/home/maps/leaflet',
        },
        {
          title: 'Bubble Maps',
          link: '/home/maps/bubble',
        },
        {
          title: 'Search Maps',
          link: '/home/maps/searchmap',
        },
      ],
    },
    // {
    //   title: 'Editors',
    //   icon: 'text-outline',
    //   children: [
    //     {
    //       title: 'TinyMCE',
    //       link: '/home/editors/tinymce',
    //     },
    //     {
    //       title: 'CKEditor',
    //       link: '/home/editors/ckeditor',
    //     },
    //   ],
    // },
    // {
    //   title: 'Tables & Data',
    //   icon: 'grid-outline',
    //   children: [
    //     {
    //       title: 'Smart Table',
    //       link: '/home/tables/smart-table',
    //     },
    //     {
    //       title: 'Tree Grid',
    //       link: '/home/tables/tree-grid',
    //     },
    //   ],
    // },
    // {
    //   title: 'Miscellaneous',
    //   icon: 'shuffle-2-outline',
    //   children: [
    //     {
    //       title: '404',
    //       link: '/home/miscellaneous/404',
    //     },
    //   ],
    // },
    {
        title: 'Secured Admin Area',
        group: true,
    },
    {
        title: 'Admin',
        icon: 'lock-outline',
        link: '/home/admin',
    },
];
