<template>
    <v-container fluid class="page-container">
        <v-row>
            <v-col cols="12">
                <v-text-field
                label="Search city..."
                filled
                shaped
                class="mx-16"
                style="font-size: 18px; opacity: 80%;"
                color="primary"
                background-color="#efefef"
                dense
                v-model="query"
                @keyup.enter="fetchWeather()"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="weather.name">
            <v-col
            cols="12"
            class="weather-location">
                <h2>{{ weather.name }}, {{ country }}</h2>
                <p><i>{{ getWeatherDate() }}</i></p>
            </v-col>
            <v-col
            cols="12"
            class="weather-date-time">
                <h1>{{ temp }} C</h1>
                <p>{{ status }}</p>
            </v-col>
        </v-row>
    </v-container>
    <!-- 
        <main>
            <div class="search-box">
                <input type="text" placeholder="Search city..." v-model="query" @keyup.enter="fetchWeather()">
            </div>

            <div v-if="weather.name" class="weather-location">
                <h2>{{ weather.name }}, {{ country }}</h2>
                <p><i>{{ getWeatherDate() }}</i></p>
            </div>
            <div v-if="weather.name" class="weather-date-time">
                <h1>{{ temp }} C</h1>
                <p>{{ status }}</p>
            </div>
        </main>
    -->

    <!-- <div class="box">
        <div class="container">
            <ul>
                <li>
                    <router-link to="/">Index</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'loginPageRoute' }">Login</router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'registerPageRoute' }">Register</router-link>
                </li>
            </ul>
        </div>
    </div> -->
</template>

<script>
import Axios from 'axios';
import Swal from 'sweetalert2';

export default {
    name: 'NavBar',
    data() {
        return {
            api_key: "c02f8a194b4361b193165a8dd667d2f4",
            api: "https://api.openweathermap.org/data/2.5/",
            query: '',
            weather: {},
            country: '',
            temp: '',
            status: '',
        }
    },
    methods: {
        fetchWeather() {

            // fetch(`${this.api}/weather?q=${this.query}&appid=${this.api_key}`)
            //     .then(res => {
            //         return res.json()
            //     }).then(response => {
            //         this.weather = response;
            //         this.country = this.weather.sys.country;
            //         this.temp = Math.floor(this.weather.main.temp) - 273;
            //         this.status = this.weather.weather[0].main;
            //     })


            if (this.query == '') {
                toast.fire({
                    icon: 'warning',
                    title: `please type a city name`,
                    customClass: {
                        timerProgressBar: 'toast-warning-pbar',
                        title: 'toast-title'
                    }
                })
            } else {
                Axios.get(`${this.api}/weather?q=${this.query}&appid=${this.api_key}`)
                    .then(response => {
                        this.weather = response.data;
                        this.country = this.weather.sys.country;
                        this.temp = Math.floor(this.weather.main.temp) - 273;
                        this.status = this.weather.weather[0].main;
                    })
                    .catch(error => {
                        console.error(error.message);
                        toast.fire({
                            icon: 'error',
                            title: `Oops! We can't find ${this.query}`,
                            customClass: {
                                timerProgressBar: 'toast-error-pbar',
                                title: 'toast-title',
                            }
                        });
                        console.clear();
                    })
            }
        },
        getWeatherDate: function () {
            let d = new Date();

            let days = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednsday",
                "Thuesday",
                "Friday",
                "Satureday",
            ]
            let mounths = [
                "Januery",
                "Febuery",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
            ]

            let year = d.getFullYear();
            let date = d.getDate();
            let day = days[d.getDay()];
            let mounth = mounths[d.getMonth()]

            return `${day}, ${date}, ${mounth}, ${year}`;


            // console.log(date);
        },
    },
    computed: {
    },
    created() {
        console.log(typeof this.weather);
    },
}

// Define custom SweetAlert as toast
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    customClass: {
        title: 'toast-title',
    }
})
</script>

<style >
.page-container {
    width: 100%;
    height: 100vh;
    background-image: url('../assets/weather-background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    filter: brightness(90%);
    font-family: Arial, Helvetica, sans-serif;
}

main {
    width: 100%;
    height: 100px;
}

.search-box {
    width: inherit;
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    & input {
        width: 90%;
        height: 50%;
        border: none;
        border-radius: 16px 4px;
        padding-left: 12px;
        font-size: 18px;
        outline: none;
        background-color: #fff;
        opacity: 60%;
        transition: opacity .4s;

        &:focus {
            opacity: 90%;
        }
    }
}

.weather-location {
    width: 100%;
    text-align: center;
    color: #fff;

    & h2 {
        font-size: 3rem;
        margin: 16px 0;
        letter-spacing: 1px;
    }

    & p {
        font-size: 1.5rem;
        letter-spacing: 1px;
    }
}

.weather-date-time {
    width: 100%;
    text-align: center;

    & h1 {
        font-size: 4rem;
        margin: 32px 0;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: #fff;
        background-color: #1f1f1f;
        letter-spacing: 1px;
        display: inline-block;
    }

    & p {
        font-size: 2.6rem;
        color: #fff;
        letter-spacing: 1px;
    }
}

.toast-error-pbar {
    background-color: #ED2939;
}
.toast-warning-pbar {
    background-color: #cbae18;
}

.toast-title {
    font-family: Arial, Helvetica, sans-serif;
}
</style>