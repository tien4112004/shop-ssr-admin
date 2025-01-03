if (!localStorage.getItem('token') && window.location.pathname !== '/login') {
  window.location.href = '/login';
}


// //Third party packages
// import '@fortawesome/fontawesome-free/js/all';
// import feather from 'feather-icons';
// import ResizeObserver from 'resize-observer-polyfill';
// import 'simplebar';

//Core components
import accordion from './components/accordion.js';
import alert from './components/alert.js';
import carousel from './components/carousel.js';
import checkAll from './components/check-all.js';
import codeViewer from './components/code-viewer.js';
import datepicker from './components/datepicker.js';
import drawer from './components/drawer.js';
import dropdown from './components/dropdown.js';
import editor from './components/editor.js';
import modal from './components/modal.js';
import searchModal from './components/search-modal.js';
import select from './components/select.js';
import sidebar from './components/sidebar.js';
import tabs from './components/tabs.js';
import themeSwitcher from './components/theme-switcher.js';
import tooltip from './components/tooltip.js';
import uploader from './components/uploader.js';

// Initialize searchModal
searchModal.init();

// Initialize themeSwitcher
themeSwitcher.init();

// Initialize codeViewer
codeViewer.init();

// Initialize alert
alert.init();

// Initialize accordion
accordion.init();

// Initialize dropdown
dropdown.init();

// Initialize modal
modal.init();

// Initialize sidebar
sidebar.init();

// Initialize tabs
tabs.init();

// Initialize Tooltip
tooltip.init();

// Initialize carousel
carousel.init();

// Initialize editor
editor.init();

// Initialize select
select.init();

// Initialize uploader
uploader.init();

// Initialize datepicker
datepicker.init();

// Initialize drawer
drawer.init();

// Initialize checkAll
checkAll.init();

// Initialize feather-icons. Must be Initialize at the end.
feather.replace();


// Polyfill for ResizeObserver
window.ResizeObserver = ResizeObserver;
