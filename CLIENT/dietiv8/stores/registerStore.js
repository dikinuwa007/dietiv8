import axios from "axios"
import { create } from "zustand"
const baseUrl = process.env.SERVER
const registerStore = create((set, get) => ({
    username : "",    
    setUsername: (username) => set(() => ({username: username})),
    email : "",    
    setEmail: (email) => set(() => ({email: email})),
    password : "",    
    setPassword: (password) => set(() => ({password: password})),
    weight : "",    
    setWeight: (weight) => set(() => ({weight: weight})),
    height : "",    
    setHeight: (height) => set(() => ({height: height})),
    dateBirth : "",    
    setDateBirth: (dateBirth) => set(() => ({dateBirth: dateBirth})),
    activityLevel : "",    
    setActivityLevel: (activityLevel) => set(() => ({activityLevel: activityLevel})),
    targetWeight : "",    
    setTargetWeight: (targetWeight) => set(() => ({targetWeight: targetWeight})),
    extra : "",    
    setExtra: (extra) => set(() => ({extra: extra})),
    gender : "",    
    setGender: (gender) => set(() => ({gender: gender})),
    getAll: () => get((state) => {
        const userRegis = {
            username: state.username,
            email: state.email,
            password: state.password,
            weight: state.weight,
            height: state.height,
            dateBirth: state.dateBirth,
            activityLevel: state.activityLevel,
            targetWeight: state.targetWeight,
            extra: state.extra,
            gender: state.gender,
        }
        console.log("test")
        return userRegis
    }),
    register: async (userInput) => await axios({
                url: baseUrl + "/users/register",
                method: "POST",
                data: userInput
            })
}))

export default registerStore