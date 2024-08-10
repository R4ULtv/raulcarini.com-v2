import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export const WelcomeEmail = ({ fname, lname, ip, location }) => {
  return (
    <Html>
      <Head />
      <Preview>Thanks for joining my newsletter.</Preview>
      <Tailwind>
        <Body className="my-auto mx-auto font-sans px-2">
          <Container className="bg-zinc-100 border border-solid border-zinc-300 rounded my-10 mx-auto p-5 max-w-xl">
            <Section className="mt-6">
              <Img
                src={`${process.env.HOST_NAME}/logo.png`}
                width="40"
                height="37"
                alt="Raul Carini"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-zinc-900 text-2xl font-normal text-center p-0 my-7 mx-0">
              Welcome to my <strong>NewsLetter</strong>
            </Heading>
            <Text className="text-zinc-900 text-sm leading-[24px]">
              Hey{" "}
              <span className="font-medium">
                {fname} {lname}
              </span>
              ,
              <br />
              you are now a member of my newsletter.
            </Text>
            <Text className="text-zinc-900 text-sm leading-[24px]">
              I'm thrilled to have you on board. Every time I publish a new
              article, I'll send you a curated selection of the best new
              articles published on our blog, covering everything from computer
              science to web development. Don't miss out on the latest news and
              insights!
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={"https://www.raulcarini.dev/blog"}
              >
                Check out my blog
              </Button>
            </Section>
            <Hr className="border border-solid border-zinc-200 my-6 mx-0 w-full" />
            <Text className="text-zinc-500 text-xs leading-[24px]">
              This email was intended for{" "}
              <span className="text-zinc-800">
                {fname} {lname}
              </span>
              . This email was sent from{" "}
              <span className="text-zinc-800">{ip?.ip || ip}</span> located in{" "}
              <span className="text-zinc-800">
                {location?.city}, {location?.country || "Unwknown"}
              </span>
              . If you were not expecting to join my newsletter, you can ignore
              this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default WelcomeEmail;
