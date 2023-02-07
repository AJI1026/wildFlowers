<!--流星雨组件-->
<template>
    <div class="meteor" :style="`transform:rotate(${rotateDeg}deg)`">
        <div class="line one" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
        <div class="line two" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
        <div class="line three" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
        <div class="line four" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
        <div class="line five" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
        <div class="line six" :style="`animationDelay:${delay}s;width:${w}px;height:${h}px;`"></div>
    </div>
</template>

<script>
export default {
    name: "meteor-component",
    props: {
        delay: {
            type: Number,
            default: 0,
        },
        w: {
            type: Number,
            default: 0,
        },
        h: {
            type: Number,
            default: 0,
        },
        rotateDeg: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style lang='scss'>
.meteor {
    width: 2px;
    height: 200px;
    position: relative;
    // overflow: hidden;
    .line {

        position: absolute;
        width: 2px;
        height: 200px;
        background: linear-gradient(
            to top,
            rgb(2, 161, 195, 1),
            rgba(11, 36, 66, 0.1)
        );
        border-radius: 2px;
        box-shadow: 0px 10px 20px 0px #02a1c3;
        opacity: 0;
        &::before {
            width: 2px;
            height: 2px;
            content: "";
            position: absolute;
            bottom: 0px;
            left: 0px;
            border-radius: 50%;
            background: #00d0ff;
            box-shadow: 0px 0px 12px 5px #00d0ff;
        }
    }
    .one {
        animation: meteoring 6s infinite linear;
    }
    .two {
        animation: meteoring 12s infinite linear;
        transform: translateX(-200px) translateY(-50px);
    }
    .three {
        animation: meteoring 18s infinite linear;
        transform: translateX(-400px) translateY(-100px);
    }
    .four {
        animation: meteoring 12s infinite linear;
        transform: translateX(200px) translateY(-120px);
    }
    .five {
        animation: meteoring 16s infinite linear;
        transform: translateX(400px) translateY(-80px);
    }
    .six {
        animation: meteoring 6s infinite linear;
        transform: translateX(-800px) translateY(-40px);
    }
}
@keyframes meteoring {
    0% {
        opacity: 0;
        top: -250px;
    }
    25% {
        opacity: 0.5;
        top: 0px;
    }
    50% {
        opacity: 0.8;
        top: 250px;
    }
    75% {
        opacity: 1;
        top: 500px;
    }
    100% {
        opacity: 0;
        top: 750px;
    }
}
</style>
