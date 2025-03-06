import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Programs from "@/components/sections/programs";
import Trainers from "@/components/sections/trainers";
import Testimonials from "@/components/sections/testimonials";
import MotivationCTA from "@/components/sections/motivation-cta";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Programs />
      <MotivationCTA
        title={`Start Your ${process.env.NEXT_PUBLIC_WEBSITE_NAME} Journey`}
        description={`Experience the transformative power of CrossFit. Join ${process.env.NEXT_PUBLIC_WEBSITE_NAME} community of dedicated athletes who push their limits and achieve the extraordinary.`}
        buttonText="Book a Free Intro Class"
        variant="primary"
      />

      <Testimonials />
      <MotivationCTA
        title={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} Elite Fitness`}
        description={`CrossFit is more than a workout - it's a proven path to elite fitness. ${process.env.NEXT_PUBLIC_WEBSITE_NAME} certified coaches and supportive community will help you become the strongest, fittest version of yourself.`}
        buttonText="Join Our Box"
        variant="dark"
      />

      <Trainers />
      <MotivationCTA
        title={`Train Like a ${process.env.NEXT_PUBLIC_WEBSITE_NAME} Champion`}
        description={`From beginner-friendly foundations to competitive athlete programming, ${process.env.NEXT_PUBLIC_WEBSITE_NAME} CrossFit box offers everything you need to excel. World-class equipment, expert coaching, and a motivating atmosphere await.`}
        buttonText="View Membership Options"
        variant="gradient"
        secondaryButton={{ text: "Meet Our Coaches", href: "/trainers" }}
      />

      <MotivationCTA
        title={`${process.env.NEXT_PUBLIC_WEBSITE_NAME} Foundations Special`}
        description={`Start your CrossFit journey with ${process.env.NEXT_PUBLIC_WEBSITE_NAME} exclusive offer:`}
        buttonText="Start Today"
        variant="black"
        listItems={[
          "Two Weeks of Foundations Classes",
          "Movement Assessment & Goal Setting",
          "Nutrition Guidance",
          "Free CrossFit Community Class",
        ]}
      />
    </main>
  );
}
