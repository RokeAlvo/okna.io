<template>
  <yandex-share
    counter
    :services="services"
    :title="title"
    :description="description"
    :url="url"
    :image="image"
    :small="small"
    :content-by-service="{ twitter: { hashtags: tags } }"
    :copy="copy ? 'last' : 'hidden'"
    :limit="limit"
  />
</template>

<script>
import YandexShare from '@cookieseater/vue-yandex-share'

export default {
  components: { YandexShare },
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    image: {
      type: String,
      default: undefined
    },
    tags: {
      type: String,
      default: ''
    },
    copy: {
      type: Boolean,
      default: true
    },
    limit: {
      type: Number,
      default: 4
    },
    small: {
      type: Boolean,
      default: false
    },
    bare: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      services: ['whatsapp', 'viber', 'telegram', 'vkontakte']
    }
  }
}
</script>

<style>
.social-sharing {
  text-align: center;
  padding: 20px;
  /* box-shadow: 0px 1px 2px #d7d8db; */
}
</style>
