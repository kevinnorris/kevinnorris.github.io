/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
console.log('navigation loaded');
const toggleNavigation = () => {
  let x = document.getElementById('topNav');
  if (x.className === 'site-nav') {
    x.className += ' responsive';
  } else {
    x.className = 'site-nav';
  }
}

window.toggleNavigation = toggleNavigation;
