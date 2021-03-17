<template>
    <section class="date-section">
        <h4> {{date.title}} </h4>
        <ul>
            <li v-for="birthdayPerson in date.birthdayPersons">
                <div>
                    {{birthdayPerson.name}}
                    <span class="age">{{birthdayPerson.age}}</span>
                </div>
            </li>
        </ul>

    </section>

</template>

<script>
    export default {
        props: {
            date: {
                type: Object,
                required: true
            }
        }
    }
</script>

