<script>
  export let isMobileMenuDropdownOpen = false;
</script>

<ul
  class="absolute menu menu-compact dropdown-content mt-2 p-2 shadow bg-base-900 rounded-box w-52 origin-top-left transition-all ease-in-out duration-200 {isMobileMenuDropdownOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}"
>
  <slot />
</ul>