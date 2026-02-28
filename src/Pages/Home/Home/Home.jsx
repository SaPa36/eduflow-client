
import Testimonials from "../../Testimonials/Testimonials";
import Banner from "../Banner/Banner";
import Features from "../Features/Features";
import JoinTeacher from "../JoinTeacher/JoinTeacher";
import Partners from "../Partners/Partners";
import PopularCourses from "../PopularCourses/PopularCourses";


const Home = () => {
    return (
        <div className="">
            
            <Banner></Banner>
            <Partners></Partners>
            <PopularCourses></PopularCourses>
            <JoinTeacher></JoinTeacher>
            <Features></Features>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;