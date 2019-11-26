<template>
  <div class="search-btn-wrapper" :class="{ 'search-open': isOpenSearch }">
    <div class="input-search-box">
      <img
        class="mob-back-img"
        src="/images/map-search/back.svg"
        @click="searchClose"
      />
      <input
        id="inpit-search"
        v-model="inputText"
        class="input-search-name"
        placeholder="Поиск ЖК/застройщика"
        spellcheck="false"
        @input="inputHandler"
      />
      <div v-if="!isOpenSearch" class="img-open-wrapper" @click="searchOpen">
        <img class="img-loop" src="/images/map-search/search-black.svg" />
      </div>
      <img
        v-else
        class="img-drop"
        src="/images/map-search/close-black.svg"
        @click="searchClose"
      />
      <!-- for mobile -->
      <img
        v-if="!inputText"
        class="mob-img-drop mob-img--loop"
        src="/images/map-search/search-black.svg"
      />
      <img
        v-else
        class="mob-img-drop"
        src="/images/map-search/close-black.svg"
        @click="mobSearchDrop"
      />
    </div>
    <div
      v-show="isOpenSearch && nameSearch.length && !choosenName"
      id="search-box"
      class="search-result-wrapper"
    >
      <div
        v-for="(residential, index) in getFilterRc.slice(0, 4)"
        :key="index"
        class="result-point"
        :class="{ 'active-name': index === currentIndex }"
        @click="
          handlerDevOrRc(
            residential.title.toLowerCase().indexOf(nameSearch) !== -1
              ? { id: residential.id, type: 'rc', name: residential.title }
              : {
                  id: residential.developer.id,
                  type: 'dev',
                  name: residential.developer.name
                }
          )
        "
      >
        <!-- @click="handlerDevOrRc(residential.title.toLowerCase().indexOf(nameSearch) !== -1 
          ? {id:residential.id,type:'rc',name: residential.title} : {id:residential.developer.id,type:'dev', name:residential.developer.name })" -->
        <div class="result-img-wrapper">
          <img
            v-if="residential.title.toLowerCase().indexOf(nameSearch) !== -1"
            class="img-result"
            src="/images/map-search/rc-search.svg"
          />
          <img
            v-else
            class="img-result"
            src="/images/map-search/developer-search.svg"
          />
        </div>
        <div class="result-title">
          {{
            residential.title.toLowerCase().indexOf(nameSearch) !== -1
              ? residential.title
              : residential.developer.name
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} = createNamespacedHelpers('mapSearch')
export default {
  props: {
    xxx: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // isOpenSearch: false,
      inputText: '',
      choosenName: '',
      currentIndex: 0
    }
  },
  computed: {
    ...mapState({
      nameSearch: (state) => state.nameSearch,
      isOpenSearch: (state) => state.isOpenSearch,
      isOpenAllFilters: (state) => state.isOpenAllFilters,
      residentials: (state) => state.residentials,
      filtredRC: (state) => state.filtredRC
    }),
    ...mapGetters(['getFiltredByName', 'getFilterRc'])
    // showDevRc(rc){

    // }
  },
  methods: {
    ...mapActions(['filter']),
    ...mapMutations([
      'setNameSearch',
      'setIsOpenSearch',
      'setIsOpenAllFilters',
      'setAccordeonClassFilters',
      'getFiltredRcByName',
      'getSearchableData'
    ]),
    searchOpen() {
      this.$emit('open-mob-search')
      this.setIsOpenSearch(true)
      if (this.isOpenAllFilters) {
        this.setIsOpenAllFilters(!this.isOpenAllFilters)
        this.setAccordeonClassFilters(false)
      }
      // setTimeout(() => document.getElementById("inpit-search").focus(), 200);
      const inp = document.getElementsByClassName('input-search-name')
      if (window.innerWidth > 500) setTimeout(() => inp[1].focus(), 200)
      else setTimeout(() => inp[0].focus(), 200)
    },
    dropName() {
      this.inputText = ''
      console.log('this.inputText: ', this.inputText)
    },
    mobSearchDrop() {
      this.inputText = ''
      this.setNameSearch('')
      document.getElementById('inpit-search').focus()
    },
    searchClose() {
      this.setIsOpenSearch(false)
      this.inputText = ''
      this.setNameSearch('')
      this.choosenName = ''
      if (this.residentials !== this.filtredRC) this.$emit('apply-filter', 10)
      this.$emit('close-name-search')
    },
    inputHandler(event) {
      const nameSearch = this.inputText.toLowerCase()
      this.$emit('inpit', nameSearch)
      this.setNameSearch(nameSearch)
      this.choosenName = ''
      this.currentIndex = 0
      // console.log("this.inputText: ", nameSearch);
      // console.log('event.target.value: ', event.target.value);
    },
    handlerDevOrRc(par) {
      console.log('par: ', par)
      this.getSearchableData(par) // записываю в стейт данные для поиска по имени
      this.getFiltredRcByName(par)
      this.$emit('show-by-name')
      this.choosenName = par.name
      this.inputText = par.name
      this.currentIndex = 0
    },
    next(list) {
      const elemsArr = Array.from(list.children)
      if (!elemsArr.length) return
      const current = elemsArr.findIndex((el) =>
        el.classList.contains('active-name')
      )
      let next = current + 1
      if (next >= elemsArr.length) next = 0
      console.log('current: ', next)
      this.currentIndex = next
    },
    prev(list) {
      const elemsArr = Array.from(list.children)
      if (!elemsArr.length) return
      const current = elemsArr.findIndex((el) =>
        el.classList.contains('active-name')
      )
      let prev = current - 1
      if (prev < 0) prev = elemsArr.length - 1
      console.log('current: ', prev)
      this.currentIndex = prev
    }
  },
  updated() {},
  mounted() {
    const list = document.getElementsByClassName('search-result-wrapper')
    const elListen = document.getElementsByClassName('search-btn-wrapper')
    for (let i = 0; i < elListen.length; i++) {
      elListen[i].addEventListener('keydown', (evt) => {
        switch (evt.keyCode) {
          case 38:
            this.prev(list[1])
            break
          case 40:
            this.next(list[1])
            break
          case 13:
            if (
              this.choosenName ||
              !this.nameSearch.length ||
              !this.getFilterRc.length
            )
              break
            const rc = this.getFilterRc.slice(0, 4)[this.currentIndex]
            console.log(rc)
            this.handlerDevOrRc(
              rc.title.toLowerCase().includes(this.nameSearch)
                ? { id: rc.id, type: 'rc', name: rc.title }
                : { id: rc.developer.id, type: 'dev', name: rc.developer.name }
            )
            this.currentIndex = 0
            document.getElementById('inpit-search').blur()
            break
        }
      })
    }

    // document.getElementsByClassName('search-btn-wrapper').addEventListener('keydown', evt => {
    //   switch (evt.keyCode) {
    //     case 38: this.prev(list); break;
    //     case 40: this.next(list); break;
    //     case 13 :
    //       if(this.choosenName
    //        || !this.nameSearch.length
    //         || !this.getFilterRc.length) break;
    //       let rc = this.getFilterRc.slice(0,4)[this.currentIndex]
    //       console.log(rc);
    //       this.handlerDevOrRc(rc.title.toLowerCase().indexOf(this.nameSearch) !== -1
    //         ? {id:rc.id,type:'rc',name: rc.title} : {id:rc.developer.id,type:'dev', name:rc.developer.name });
    //       this.currentIndex = 0;
    //       document.getElementById("inpit-search").blur()
    //       break;
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
.search-btn-wrapper {
  background: #fdfdfd;
  box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
  border-radius: 50%;
  width: 50px;
  min-height: 50px;
  cursor: pointer;
  overflow: hidden;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  transition: 0.2s;
  .input-search-box {
    position: relative;
    display: flex;
    display: flex;
    width: 100%;

    height: 50px;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
    .img-open-wrapper {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      box-shadow: 0px 2px 4px rgba(66, 72, 77, 0.1);
      // border-radius: 8px 8px 0px 0px;
    }
  }
  input {
    display: none;
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 50px;
    background: #fdfdfd;
    border: none;
    // box-shadow: inset 0px 0px 4px rgba(90, 88, 99, 0.15);
    font-family: Montserrat;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 25px;
    letter-spacing: 0.1px;

    color: #626c7a;
    transition: 0.1s;
    opacity: 0.9;
    box-shadow: none;
    &::placeholder {
      opacity: 0.5;
    }
  }
  .img-loop {
    opacity: 0.5;
    margin-left: 2px;
    margin-top: 0px;
  }
  .img-drop {
    cursor: pointer;
    opacity: 0.5;
    position: absolute;
    right: 10px;
    z-index: 2;
  }
  .mob-img-drop {
    display: none;
  }
}

.search-result-wrapper {
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  letter-spacing: 0.1px;
  color: #5a5863;
  opacity: 0.9;
  border-radius: 30px;
  padding: 0px 20px;
  .result-point {
    cursor: pointer;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f4f4f5;
    padding: 18px 0;
    &:last-child {
      border-bottom: none;
    }
  }
  .result-img-wrapper {
    min-width: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
}

.search-open {
  cursor: default;
  width: 340px;
  border-radius: 8px;
  .input-search-box {
  }
  input {
    display: block;
  }
}
.active-name {
  font-weight: 600;
}
.mob-back-img {
  display: none;
  transition: 0.2s;
  opacity: 0;
}

@media (max-width: 500px) {
  .search-btn-wrapper {
    box-shadow: none;
    border-radius: 0;
    width: 65px;
  }
  .search-open {
    width: 100vw;
    border-radius: 0px;
    .mob-back-img {
      display: block;
      opacity: 0.6;
      margin-left: 10px;
      cursor: pointer;
    }
    .img-drop {
      display: none;
    }

    .mob-img-drop {
      display: block;
      cursor: pointer;
      opacity: 0.5;
      position: absolute;
      right: 10px;
      z-index: 2;
    }
    .mob-img--loop {
      cursor: default;
      margin-right: 10px;
    }
  }
}
</style>
