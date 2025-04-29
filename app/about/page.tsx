"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Heart, Truck, HeadsetIcon, ShieldCheck, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import FadeIn from "@/components/animations/fade-in"
import StaggerContainer from "@/components/animations/stagger-container"
import StaggerItem from "@/components/animations/stagger-item"
import ScaleIn from "@/components/animations/scale-in"
import HoverCard from "@/components/animations/hover-card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <FadeIn className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-6 text-center">About BookHaven</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400">
          Connecting readers with their next favorite books since 2010
        </p>
      </FadeIn>

      {/* Hero Section */}
      <motion.div
        className="relative w-full h-[400px] rounded-xl overflow-hidden mb-16"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src="/placeholder (1).jpg"
          alt="BookHaven store interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <FadeIn direction="left" className="text-white p-8 md:p-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Story</h2>
            <p className="text-lg mb-6">
              Founded by book lovers for book lovers, BookHaven began as a small corner bookshop and has grown into the
              premier online destination for bibliophiles everywhere.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </motion.div>
          </FadeIn>
        </div>
      </motion.div>

      {/* Mission & Values */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Values</h2>
        </FadeIn>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
          <StaggerContainer staggerChildren={0.2}>
            {[
              {
                icon: BookOpen,
                title: "Spread Knowledge",
                description:
                  "We believe in the power of books to educate, inspire, and transform lives. Our mission is to make quality literature accessible to everyone.",
              },
              {
                icon: Users,
                title: "Build Community",
                description:
                  "Books bring people together. We foster a community of readers who share ideas, recommendations, and a passion for literature.",
              },
              {
                icon: Heart,
                title: "Support Authors",
                description:
                  "We champion authors both established and emerging, ensuring fair compensation and promoting diverse voices in literature.",
              },
            ].map((value, index) => (
              <StaggerItem key={index}>
                <HoverCard>
                  <Card className="text-center h-full">
                    <CardContent className="pt-6">
                      <motion.div
                        className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <value.icon className="h-8 w-8 text-primary" />
                      </motion.div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Company History */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        </FadeIn>
        <div className="space-y-12">
          <FadeIn direction="right">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Badge className="mb-2">2010</Badge>
                <h3 className="text-2xl font-bold mb-4">The Beginning</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  BookHaven started as a small corner bookshop in downtown Reading City. Founded by Sarah and Michael
                  Thompson, two literature professors with a dream of creating a haven for book lovers.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  With just 500 carefully curated titles and a small but dedicated customer base, we began our journey
                  to spread the love of reading.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[300px] w-full rounded-xl overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full"
                >
                  <Image
                    src="/begining.jpg"
                    alt="BookHaven in 2010"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="flex flex-col md:flex-row-reverse items-center gap-8">
              <div className="md:w-1/2">
                <Badge className="mb-2">2015</Badge>
                <h3 className="text-2xl font-bold mb-4">Digital Transformation</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Recognizing the changing landscape of retail, we launched our first e-commerce platform while
                  maintaining our physical store. This allowed us to reach readers beyond our local community.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  We expanded our inventory to over 10,000 titles and began hosting virtual book clubs and author
                  events.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[300px] w-full rounded-xl overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full"
                >
                  <Image
                    src="/digital.jpg"
                    alt="BookHaven digital transformation"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="right">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <Badge className="mb-2">2023</Badge>
                <h3 className="text-2xl font-bold mb-4">BookHaven Today</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Today, BookHaven has grown into a beloved online destination for bibliophiles worldwide. We offer over
                  100,000 titles across all genres, from bestsellers to rare finds.
                </p>
                <p className="text-gray-600 dark:text-gray-400">
                  While we've embraced technology, our core values remain unchanged: a passion for literature,
                  commitment to customer service, and dedication to building a community of readers.
                </p>
              </div>
              <div className="md:w-1/2 relative h-[300px] w-full rounded-xl overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="h-full w-full"
                >
                  <Image
                    src="/today.jpg"
                    alt="BookHaven today"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Thompson",
              role: "Co-Founder & CEO",
              bio: "Former literature professor with a passion for making books accessible to everyone.",
              image: "/team1.jpg",
            },
            {
              name: "Michael Thompson",
              role: "Co-Founder & Head Curator",
              bio: "Specializes in discovering hidden literary gems and emerging authors.",
              image: "/team2.jpg",
            },
            {
              name: "Elena Rodriguez",
              role: "Chief Technology Officer",
              bio: "Tech enthusiast who leads our digital innovation and online experience.",
              image: "/team4.jpg",
            },
            {
              name: "David Chen",
              role: "Customer Experience Director",
              bio: "Ensures every customer interaction with BookHaven exceeds expectations.",
              image: "/team3.jpg",
            },
          ].map((member, index) => (
            <StaggerItem key={index}>
              <HoverCard className="h-full">
                <Card className="overflow-hidden h-full">
                  <motion.div
                    className="relative h-[250px] w-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </motion.div>
                  <CardContent className="pt-4">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-gray-600 dark:text-gray-400">{member.bio}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose BookHaven</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Curated Selection",
              description: "Every book in our collection is hand-selected for quality and reader appeal.",
            },
            {
              icon: Truck,
              title: "Fast Delivery",
              description: "Free shipping on orders over $35, with most deliveries arriving within 3-5 business days.",
            },
            {
              icon: HeadsetIcon,
              title: "Expert Support",
              description: "Our team of book enthusiasts is always ready to help with personalized recommendations.",
            },
            {
              icon: ShieldCheck,
              title: "Satisfaction Guarantee",
              description: "Not happy with your purchase? We offer hassle-free returns within 30 days.",
            },
          ].map((feature, index) => (
            <StaggerItem key={index}>
              <HoverCard className="h-full">
                <Card className="h-full">
                  <CardContent className="pt-6">
                    <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
                      <feature.icon className="h-10 w-10 text-primary mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Testimonials */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "BookHaven has transformed my reading experience. Their recommendations are always spot-on, and I love the personal touch in every package.",
              author: "Jessica K.",
              location: "New York, NY",
            },
            {
              quote:
                "As an avid reader living in a rural area, BookHaven has given me access to books I could never find locally. Their service is exceptional.",
              author: "Robert M.",
              location: "Boise, ID",
            },
            {
              quote:
                "I've been a BookHaven customer for over 5 years. Their curation is unmatched, and I've discovered so many amazing authors through their recommendations.",
              author: "Priya S.",
              location: "Chicago, IL",
            },
          ].map((testimonial, index) => (
            <StaggerItem key={index}>
              <HoverCard>
                <Card className="bg-primary/5 h-full">
                  <CardContent className="pt-6">
                    <motion.div
                      className="text-4xl text-primary mb-4"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      "
                    </motion.div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 italic">{testimonial.quote}</p>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.location}</div>
                  </CardContent>
                </Card>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {/* Awards & Recognition */}
      <div className="mb-16">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-8 text-center">Awards & Recognition</h2>
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              year: "2023",
              award: "Best Online Bookstore",
              organization: "E-Commerce Excellence Awards",
            },
            {
              year: "2022",
              award: "Outstanding Customer Service",
              organization: "Retail Industry Association",
            },
            {
              year: "2021",
              award: "Innovation in Bookselling",
              organization: "Publishers Weekly",
            },
            {
              year: "2020",
              award: "Community Impact Award",
              organization: "Reading City Chamber of Commerce",
            },
            {
              year: "2019",
              award: "Best User Experience",
              organization: "Digital Retail Awards",
            },
            {
              year: "2018",
              award: "Small Business of the Year",
              organization: "Regional Business Council",
            },
          ].map((award, index) => (
            <StaggerItem key={index}>
              <HoverCard>
                <Card className="flex h-full">
                  <CardContent className="pt-6 flex items-start gap-4">
                    <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 300 }}>
                      <Award className="h-8 w-8 text-primary flex-shrink-0" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{award.year}</div>
                      <h3 className="text-lg font-bold">{award.award}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{award.organization}</p>
                    </div>
                  </CardContent>
                </Card>
              </HoverCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

{/* Partners */}
<div className="mb-16">
  <FadeIn>
    <h2 className="text-3xl font-bold mb-8 text-center">Our Partners</h2>
  </FadeIn>
  <motion.div
    className="flex flex-wrap justify-center gap-8 items-center"
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    }}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true }}
  >
    {[
      "partner1.png",
      "partner2.webp",
      "partner3.jpeg",
      "partner4.jpeg",
      "partner5.jpg",
      "partner6.jpeg",
    ].map((fileName, index) => (
      <motion.div
        key={index}
        className="grayscale hover:grayscale-0 transition-all duration-300"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0 },
        }}
        whileHover={{ scale: 1.1 }}
      >
        <Image
          src={`/partners/${fileName}`}  // Adjust this path as needed
          alt={`Partner ${index + 1}`}
          width={180}
          height={60}
        />
      </motion.div>
    ))}
  </motion.div>
</div>


      {/* CTA */}
      <ScaleIn>
  <div className="relative bg-primary text-white rounded-xl overflow-hidden">
    {/* Background image */}
    <Image
      src="/cta.jpg" // Replace with your actual image path
      alt="Books Background"
      fill
      className="object-cover opacity-80"
      priority
    />

    {/* Overlay content */}
    <div className="relative z-10 p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold mb-4">Join Our Community of Book Lovers</h2>
      <p className="text-lg mb-6 max-w-2xl mx-auto">
        Discover your next favorite book, connect with fellow readers, and enjoy exclusive benefits when you shop
        with BookHaven.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/books">Browse Books</Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
            <Link href="/register">Create Account</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  </div>
</ScaleIn>


    </div>
  )
}
