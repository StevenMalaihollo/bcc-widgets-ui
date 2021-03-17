<template>
    <div class="col post-item">
        <div class="col-inner">
            <a v-bind:href="post.link" class="plain">
                <div class="box box-default box-text-bottom box-blog-post has-hover">
                    <div class="box-image">
                        <div class="image-cover" style="padding-top:56%">
                            <img v-bind:src="post.imageUrl">
                        </div>
                    </div>
                    <div class="box-text text-center is-xsmall" style="background-color:rgb(255, 255, 255);padding:20px">
                        <div class="box-text-inner blog-post-inner">
                            <p class="cat-label  is-xxsmall op-7 uppercase">{{post.source}}</p>
                            <h5 class="post-title is-large">{{post.title}}</h5>
                            <div class="is-divider"></div>
                        </div>
                    </div>
                    <div class="badge absolute top post-date badge-square">
                        <div class="badge-inner">
                            <span class="post-date">{{datePublished}}</span> 
                            <br>                         
                            <span class="post-date-month is-xsmall">{{monthPublished}}</span>
                        </div>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
<script>

import localeHelper from '../../utils/localeHelper'

export default {
    props: {    
        post: {
            type: Object,
            required: true
        }
    },
    computed: {
        datePublished(){
            return new Date(this.post.datePublished).toLocaleDateString(localeHelper.getDateLocale(), { day: 'numeric' });
        },
        monthPublished(){
            return new Date(this.post.datePublished).toLocaleDateString(localeHelper.getDateLocale(), { month: 'short'  });
        }
    }
}
</script>
