<template>
    <aside class="mdc-drawer"
           :class="classes">
        <div class="mdc-drawer__header">
            <h3 class="mdc-drawer__title">
                Benvenuto
            </h3>
            <h6 class="mdc-drawer__subtitle">
                Visitatore anonimo
            </h6>
        </div>
        <div class="mdc-drawer__content">
            <List>
                <NuxtLink v-for="page in pages"
                          :key="page.id"
                          v-slot="{ href, route, navigate, isActive }"
                          custom
                          :exact="page.path === '/'"
                          :to="page">
                    <ListItem :active="isActive"
                              :icon="page.icon"
                              :title="`Naviga a ${page.title}`"
                              :href="href"
                              @click="onClickEvent(route, navigate, $event)">
                        {{ page.title }}
                    </ListItem>
                </NuxtLink>
                <hr class="mdc-list-divider" />
                <h6 class="mdc-list-group__subheader">
                    Contattami
                </h6>
                <ListItem fa
                          href="//discord.gg/5QvHTwzvqW"
                          icon="discord"
                          target="_blank"
                          title="Unisciti alla community su Discord"
                          rel="nofollow noopener noreferrer"
                          @click="emitSelectEvent">
                    Chatta
                    <sup class="badge">new</sup>
                </ListItem>
                <ListItem icon="mail"
                          title="Scrivimi un messaggio privatamente"
                          @click="openContactDialog">
                    Scrivi
                </ListItem>
                <ListItem title="Something" @click="emitMessage">
                    Emetti messaggio
                </ListItem>
            </List>
        </div>
        <div class="mdc-drawer__footer">
            <i>Vue</i>rsione corrente:
            <strong>{{ version }}</strong>
        </div>
    </aside>
</template>

<script lang="ts">
    import Vue from "vue";
    import { mapState } from "vuex";
    import { Route } from "vue-router";

    import { cssClasses } from "@material/drawer";

    import List from "@/components/mdc/lists/list.vue";
    import ListItem from "@/components/mdc/lists/list-item.vue";

    export default Vue.extend({
        name: "Drawer",
        components: { List, ListItem },
        props: {
            value: {
                default: false,
                type: Boolean
            },
            modal: {
                default: false,
                type: Boolean
            }
        },
        computed: {
            classes(): Record<string, boolean>
            {
                return {
                    "mdc-drawer--modal": this.modal,
                    [cssClasses.OPEN]: this.value
                };
            },

            ...mapState("config", {
                pages: "pages",
                version: "version"
            })
        },
        methods: {
            emitSelectEvent(evt: MouseEvent): void
            {
                this.$emit("select", evt);
            },
            openContactDialog(evt: MouseEvent): void
            {
                this.$store.dispatch("contact");

                this.emitSelectEvent(evt);
            },

            onClickEvent(route: Route, navigate: (e: Event) => void, evt: MouseEvent): void
            {
                navigate(evt);

                this.emitSelectEvent(evt);
            },

            // export interface Button
            // {
            //     type: "primary" | "secondary";
            //     text: string;
            //
            //     action: () => void;
            // }
            // export interface Message
            // {
            //     type?: "success" | "info" | "warning" | "danger";
            //     icon?: string;
            //     title?: string;
            //     text: string;
            // }
            // export interface Alert
            // {
            //     type: "banner" | "dialog" | "snackbar";
            //     message: Message;
            //     timeout?: number;
            //     buttons?: Button[];
            // }

            emitMessage(): void
            {
                this.$store.dispatch("alert", {
                    type: "snackbar",
                    message: {
                        text: "Questo è un messaggio di prova."
                    },
                    buttons: [{
                        type: "primary",
                        text: "Esplodi!",

                        action: () => console.log("%cBOOOM! 💣💥", "font-size: 100px; color: red; font-weight: bold;")
                    }]
                });
            }
        }
    });
</script>

<style lang="scss" scoped>
    @use "~@/assets/scss/variables";

    @import "~@material/animation/variables";
    @import "~@material/drawer/variables";

    .mdc-drawer
    {
        border: none;
        margin-left: -$mdc-drawer-width;
        position: fixed;
        transition-duration: $mdc-drawer-animation-enter;
        transition-property: box-shadow, margin;
        transition-timing-function: $mdc-animation-standard-curve-timing-function;

        & > .mdc-drawer__header,
        & > .mdc-drawer__content
        {
            border-bottom: none;
            border-right: 1px solid rgba(0, 0, 0, 0.12);

            & > .mdc-list > .mdc-list-item .badge
            {
                background-color: variables.$primary-color;
                border: 1px solid #145ca4;
                border-radius: 0.5em;
                color: #FFFFFF;
                display: inline-block;
                font-style: italic;
                height: 1em;
                line-height: 0.666em;
                padding: 0px 0.5em;
                padding-left: 0.4em;
            }
        }
        & > .mdc-drawer__footer
        {
            background-color: variables.$chrome-link-preview-color;
            border-right: 1px solid rgba(0, 0, 0, 0.075);
            border-top: 1px solid rgba(0, 0, 0, 0.075);
            color: #5F5F5F;
            font-size: smaller;
            padding: 0.75em 1em;
            text-align: right;
            text-shadow: 1px 1px 1px #FFFFFF;

            & > i
            {
                margin-right: 0.0875em;
            }
            & > strong
            {
                font-size: larger;
            }
        }

        &.mdc-drawer--modal
        {
            box-shadow: none;
            display: flex;

            &.mdc-drawer--open
            {
                box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2),
                            0px 16px 24px 2px rgba(0, 0, 0, 0.14),
                            0px 6px 30px 5px rgba(0, 0, 0, 0.12);
            }
        }
        &.mdc-drawer--open
        {
            margin-left: 0px;
            transition-duration: $mdc-drawer-animation-exit;
        }

        @media print
        {
            display: none;
        }
    }
</style>
