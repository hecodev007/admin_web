<template lang="pug">
.v-main(:class="{'v-main-full':full}")
  Row
    Col(span="18")
      Breadcrumb
        BreadcrumbItem Home
        BreadcrumbItem {{$lang(title)}}
    Col(span="6" style="text-align:right")
      Dropdown.locale(trigger="click") 
        Button(size="small") {{lang[$i18n.locale]}}
          Icon(type="ios-arrow-down")
        DropdownMenu(slot="list")
          DropdownItem(@click.native="setLocale('zh_CN')") 中文
          DropdownItem(@click.native="setLocale('en_US')") English
  slot
</template>
<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lang(){
      return this.$store.state.lang
    }
  },
  methods: {
    setLocale(lang) {
      this.$store.commit("setLocale", lang);
    }
  },
  data() {
    return {
        title : 11111
    };
  },
  created(){
      this.title = this.$route.meta.name
  }
};
</script>