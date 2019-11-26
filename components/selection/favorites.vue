<template>
  <div class="favorites">
    <div class="favorites__title">Избранные квартиры: 5</div>
    <div class="table-wrapper">
      <table class="table-state">
        <tr v-for="title in tableHead" :key="title.plan">
          <td>{{ title }}</td>
        </tr>
      </table>

      <div class="table-scrolling">
        <table v-for="item in testArr" :key="item.id" class="favorites-jk">
          <tr v-for="(itemTr, key) in item" :key="itemTr['id']">
            <td
              v-if="key != 'id'"
              :class="[key === 'plan' ? 'td--' + 'plan' : 'td td--' + key]"
              :style="[
                key === 'plan'
                  ? { background: 'url(' + itemTr + ')no-repeat center' }
                  : ''
              ]"
            >
              <span v-if="key != 'btn' && key != 'jk'" class>{{ itemTr }}</span>
              <span v-if="key === 'btn'" href>Удалить</span>
              <a v-if="key === 'jk'" href>{{ itemTr }}</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="social-wrapper">
      <div class="social__text">
        Поделитесь ссылкой на избранное и выбирайте вместе с близкими
      </div>
      <div class="social__links b-share-small-wrap">
        <icons-share />
      </div>
    </div>
  </div>
</template>

<script>
const tableHeadler = {
  plan: 'План',
  rooms: 'Комнаты',
  jk: 'ЖК',
  material: 'Материал',
  decorate: 'Отделка',
  lease: 'Сдача',
  floor: 'Этаж',
  s: 'Площадь',
  price: 'Цена'
}
export default {
  data() {
    return {
      tableHead: tableHeadler,
      testArr: [
        {
          id: 0,
          plan: '/img/12.jpg',
          rooms: '2-ком. ст.',
          jk: 'Гринарт',
          material: 'кирпич',
          decorate: 'чистая',
          lease: 'сдан',
          floor: '13',
          s: '14-43 м',
          price: '1700000',
          btn: ''
        },
        {
          id: 1,
          plan: '/img/12.jpg',
          rooms: '2-ком. ст.',
          jk: 'Гринарт',
          material: 'кирпич',
          decorate: 'чистая',
          lease: 'сдан',
          floor: '13',
          s: '14-43 м',
          price: '1700000',
          btn: ''
        },
        {
          id: 2,
          plan: '/img/12.jpg',
          rooms: '2-ком. ст.',
          jk: 'Гринарт',
          material: 'кирпич',
          decorate: 'чистая',
          lease: 'сдан',
          floor: '13',
          s: '14-43 м',
          price: '1700000',
          btn: ''
        },
        {
          id: 3,
          plan: '/img/12.jpg',
          rooms: '2-ком. ст.',
          jk: 'Гринарт',
          material: 'кирпич',
          decorate: 'чистая',
          lease: 'сдан',
          floor: '13',
          s: '14-43 м',
          price: '1700000',
          btn: ''
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.favorites__title {
  font-weight: 500;
  font-size: 20px;
  line-height: normal;
  letter-spacing: 0.2px;

  color: rgba($color: #5a5863, $alpha: 0.9);
  margin: 50px 0 20px 10px;
  width: 93.75%;
  padding-bottom: 23px;
  border-bottom: 1px solid rgba($color: #dfe2e3, $alpha: 0.5);

  /* #5A5863 */
}

.table-wrapper {
  display: flex;

  border-bottom: 1px solid rgba($color: #dfe2e3, $alpha: 0.5);
  margin-bottom: 40px;
  padding-bottom: 50px;
}

.td {
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.1px;
  &--rooms {
    font-weight: 500;

    color: rgba($color: #5a5863, $alpha: 0.9);
  }

  &--plan {
    height: 180px;
    width: 170px;
    margin: 0 auto;

    //   background-size: contain;
    //   background-repeat: no-repeat;
    //   background-position: center;
    /* color: indianred; */
    color: transparent;
  }

  &--jk {
    a {
      line-height: 20px;

      text-decoration-line: underline;

      color: #5a5863;

      opacity: 0.9;
    }
  }

  &--material {
    line-height: 16px;

    color: #5a5863;

    opacity: 0.9;
  }

  &--s {
    line-height: 25px;
  }

  &--price {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
  }

  &--btn {
    font-weight: 500;
    color: rgba($color: #d18955, $alpha: 0.7);
    span {
      cursor: pointer;
    }
  }
}

.table-scrolling {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;

  table {
    width: 170px;
    flex: 0 0 auto;
    margin-right: 10px;
    background: #ffffff;
    /* 2 px */
    tr {
      text-align: center;
    }

    tr:last-child {
      td {
        border: none;
      }
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

table {
  height: 570px;
  tr {
    height: 40px;
    td {
      padding: 12px 0 7px 0;
      border-bottom: 1px rgba($color: #dfe2e3, $alpha: 0.2) solid;
    }
  }
}

.table-state {
  padding-bottom: 42px;
  margin-left: 10px;
  padding-right: 5px;
  width: 70px;
  tr {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.1px;

    color: rgba($color: #626c7a, $alpha: 0.5);
  }

  tr:first-child {
    height: 180px;
    width: 170px;
    td {
      vertical-align: initial;
      padding-top: 30px;
    }
  }
}

.favorites-jk {
  tr:first-child {
    display: none;
  }
}

.social__links {
  width: 260px;
  margin: 0 auto;
  margin-bottom: 40px;
}

.ya-share2__list {
  width: 260px;
  height: 50px;
  display: flex !important;
  justify-content: space-between;
}

.ya-share2__item {
  transform: scale(2.1);
  align-self: end;
}

.ya-share2__badge {
  border-radius: 50px !important;
}

.social__text {
  width: 270px;
  margin: 0 auto;
  margin-bottom: 34px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  letter-spacing: 0.1px;

  color: #5a5863;
}
</style>
