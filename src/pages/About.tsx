import {Typography} from "@mui/material";
import Header from "../components/Header.tsx";

const AboutContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col items-start gap-20 mt-20 mb-36 mx-auto w-4/5">
            {children}
        </div>
    );
}

const AboutSubContainer = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="flex flex-col items-start gap-6 w-full">
            {children}
        </div>
    );
}

function About() {
    return (
        <>
            <Header/>
            <AboutContainer>
                <AboutSubContainer>
                    <Typography variant={"h2"}>
                        About TKD
                    </Typography>
                    <Typography variant={"body1"}
                                className={"text-xl"}>
                        <b>Welcome to The Kadazandusun Dictionary (TKD)</b>, a dedicated platform for preserving and revitalizing the Kadazandusun language. <br/>
                        Our goal is to create an accessible, digital dictionary that enables both native speakers and language enthusiasts to explore and contribute to the richness of Kadazandusun.
                    </Typography>
                </AboutSubContainer>

                <AboutSubContainer>
                    <Typography variant={"h3"}>
                        Our Mission
                    </Typography>
                    <Typography variant={"body1"}
                                className={"text-lg"}>
                        We aim to keep the Kadazandusun language alive through digitalization. As an endangered language, Kadazandusun faces unique challenges, <br/>
                        but with technology and community support, we can document and share its beauty for generations to come.
                    </Typography>
                </AboutSubContainer>
                <AboutSubContainer>
                    <Typography variant={"h3"}>
                        Our Vision
                    </Typography>
                    <Typography variant={"body1"}
                                className={"text-lg"}>
                        With the community’s support, we envision TKD as a comprehensive, accessible resource that keeps the Kadazandusun language vibrant and relevant in the digital age.
                    </Typography>
                </AboutSubContainer>

                <AboutSubContainer>
                    <Typography variant={"h3"}>
                        Why it matters
                    </Typography>
                    <Typography variant={"body1"}
                                className={"text-lg"}>
                        Languages are integral to cultural identity. By learning and preserving Kadazandusun, we celebrate the heritage and traditions of the Kadazandusun people of Sabah, Malaysia. <br/>
                        This platform is designed for everyone, from learners and native speakers to linguists and historians.
                    </Typography>
                </AboutSubContainer>

                <AboutSubContainer>
                    <Typography variant={"h4"}>
                        Features of TKD
                    </Typography>
                    <Typography variant={"body1"}
                                component={"ul"}
                                className={"text-lg"}>
                        <Typography variant={"body1"}
                                    component={"li"}
                                    className={"text-lg"}>
                            <b>Dictionary Access:</b> Search and explore Kadazandusun words with definitions, translations, and examples of usage.
                        </Typography>
                        <Typography variant={"body1"}
                                    component={"li"}
                                    className={"text-lg"}>
                            <b>User Contributions:</b> Add new words or submit original entries to expand the Kadazandusun lexicon. Each submission is valuable in documenting and preserving the language. <br/>
                            {/*We also welcome submissions for other dialects of the Kadazandusun language, enhancing the richness and diversity of our dictionary.*/}
                        </Typography>
                        <Typography variant={"body1"}
                                    component={"li"}
                                    className={"text-lg"}>
                            <b>Community Engagement:</b> Participate in language preservation by sharing knowledge and learning alongside others.
                        </Typography>
                    </Typography>
                </AboutSubContainer>
            </AboutContainer>
        </>
    );
}

export default About;