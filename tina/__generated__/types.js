export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomePartsFragmentDoc = gql`
    fragment HomeParts on Home {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  heroImages {
    __typename
    img
    alt
  }
  hero {
    __typename
    subtitle
    titleLine1
    titleLine2
    titleLine3
    contactButtonText
    description
  }
  about {
    __typename
    subtitle
    titleLine1
    titleLine2
    titleLine3
    image
    paragraphs
  }
  stats {
    __typename
    value
    label
    iconName
  }
  brandStatement {
    __typename
    image
    titleLine1
    titleLine2
    titleLine3
    sinceText1
    sinceText2
    description
  }
  expertiseSection {
    __typename
    subtitle
    titleLine1
    titleLine2
  }
  whyChooseUs {
    __typename
    subtitle
    titleLine1
    titleLine2
    reasons {
      __typename
      title
      desc
    }
  }
  bottomStatement {
    __typename
    paragraph
    titleLine1
    titleLine2
  }
  happyClients {
    __typename
    name
    logo
  }
}
    `;
export const AboutPartsFragmentDoc = gql`
    fragment AboutParts on About {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  hero {
    __typename
    subtitle
    title
    description
  }
  mainSection {
    __typename
    paragraphs
    buttonText
    image
  }
  stats {
    __typename
    value
    label
    iconName
  }
  mission {
    __typename
    title
    text
  }
  vision {
    __typename
    title
    text
  }
  founder {
    __typename
    sectionSubtitle
    sectionTitleLine1
    sectionTitleLine2
    image
    name
    role
    location
    aboutMyselfText
    expertiseText
  }
  credentials {
    __typename
    title
    items
  }
  achievements {
    __typename
    title
    items
  }
  whyChooseUs {
    __typename
    subtitle
    titleLine1
    titleLine2
    description
    highlights {
      __typename
      title
      description
      iconName
    }
  }
}
    `;
export const ServicesPartsFragmentDoc = gql`
    fragment ServicesParts on Services {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  hero {
    __typename
    subtitle
    titleLine1
    titleLine2
    description
  }
  catalog {
    __typename
    title
    slug
    icon
    description
    sections {
      __typename
      eyebrow
      title
      accent
      description
      listItems
    }
    items {
      __typename
      name
      slug
      sections {
        __typename
        eyebrow
        title
        accent
        description
        listItems
      }
    }
  }
}
    `;
export const GalleryPartsFragmentDoc = gql`
    fragment GalleryParts on Gallery {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  header {
    __typename
    title
    subtitle
    description
  }
  categories
  photos {
    __typename
    title
    description
    src
    category
  }
}
    `;
export const TestimonialsPartsFragmentDoc = gql`
    fragment TestimonialsParts on Testimonials {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  header {
    __typename
    eyebrow
    title
    description
  }
  overallRating {
    __typename
    score
    totalReviews
  }
  featured {
    __typename
    quote
    name
    role
    initials
  }
  items {
    __typename
    title
    quote
    name
    role
    initials
    offset
  }
}
    `;
export const CareersPartsFragmentDoc = gql`
    fragment CareersParts on Careers {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  header {
    __typename
    eyebrow
    title
    description
  }
  jobs {
    __typename
    id
    title
    location
    experience
    jobType
    companyDescription
    mandatoryCriteria
    responsibilities
    workingConditions
  }
}
    `;
export const ContactPartsFragmentDoc = gql`
    fragment ContactParts on Contact {
  __typename
  seo {
    __typename
    title
    description
    keywords
  }
  header {
    __typename
    eyebrow
    titleLine1
    titleLine2
    description
  }
  contactCards {
    __typename
    title
    icon
    lines
    hrefs
  }
  socials {
    __typename
    label
    url
    icon
    className
  }
}
    `;
export const FranchisePartsFragmentDoc = gql`
    fragment FranchiseParts on Franchise {
  __typename
  seo {
    __typename
    title
    description
  }
  header {
    __typename
    eyebrow
    title
    titleItalic
    subtitle
    highlight
  }
  sections {
    __typename
    title
    icon
    items
  }
  modelsTitle
  models {
    __typename
    name
    investment
  }
  visionTitle
  vision
  closing {
    __typename
    line1
    line1Italic
    line2
  }
}
    `;
export const MembershipPartsFragmentDoc = gql`
    fragment MembershipParts on Membership {
  __typename
  seo {
    __typename
    title
    description
  }
  hero {
    __typename
    eyebrow
    titleLine1
    titleItalic
    titleLine3
    description
    badges
  }
  whySection {
    __typename
    title
    description
    cards {
      __typename
      icon
      title
      desc
    }
  }
  benefitsSection {
    __typename
    title
    cards {
      __typename
      icon
      title
      items
      gradient
    }
  }
  milestoneSection {
    __typename
    title
    description
    milestones {
      __typename
      title
      icon
    }
  }
  rewardsSection {
    __typename
    title
    rewards
  }
  exclusiveOffersSection {
    __typename
    title
    offers
  }
  perfectForSection {
    __typename
    title
    items {
      __typename
      title
      icon
    }
  }
  promiseSection {
    __typename
    title
    text
    signature
  }
  ctaSection {
    __typename
    titleLine1
    titleLine2
    description
  }
}
    `;
export const HomeDocument = gql`
    query home($relativePath: String!) {
  home(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeParts
  }
}
    ${HomePartsFragmentDoc}`;
export const HomeConnectionDocument = gql`
    query homeConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeFilter) {
  homeConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeParts
      }
    }
  }
}
    ${HomePartsFragmentDoc}`;
export const AboutDocument = gql`
    query about($relativePath: String!) {
  about(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...AboutParts
  }
}
    ${AboutPartsFragmentDoc}`;
export const AboutConnectionDocument = gql`
    query aboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: AboutFilter) {
  aboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...AboutParts
      }
    }
  }
}
    ${AboutPartsFragmentDoc}`;
export const ServicesDocument = gql`
    query services($relativePath: String!) {
  services(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServicesParts
  }
}
    ${ServicesPartsFragmentDoc}`;
export const ServicesConnectionDocument = gql`
    query servicesConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServicesFilter) {
  servicesConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServicesParts
      }
    }
  }
}
    ${ServicesPartsFragmentDoc}`;
export const GalleryDocument = gql`
    query gallery($relativePath: String!) {
  gallery(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...GalleryParts
  }
}
    ${GalleryPartsFragmentDoc}`;
export const GalleryConnectionDocument = gql`
    query galleryConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: GalleryFilter) {
  galleryConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...GalleryParts
      }
    }
  }
}
    ${GalleryPartsFragmentDoc}`;
export const TestimonialsDocument = gql`
    query testimonials($relativePath: String!) {
  testimonials(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialsParts
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const TestimonialsConnectionDocument = gql`
    query testimonialsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialsFilter) {
  testimonialsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialsParts
      }
    }
  }
}
    ${TestimonialsPartsFragmentDoc}`;
export const CareersDocument = gql`
    query careers($relativePath: String!) {
  careers(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...CareersParts
  }
}
    ${CareersPartsFragmentDoc}`;
export const CareersConnectionDocument = gql`
    query careersConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: CareersFilter) {
  careersConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...CareersParts
      }
    }
  }
}
    ${CareersPartsFragmentDoc}`;
export const ContactDocument = gql`
    query contact($relativePath: String!) {
  contact(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactParts
  }
}
    ${ContactPartsFragmentDoc}`;
export const ContactConnectionDocument = gql`
    query contactConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactFilter) {
  contactConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactParts
      }
    }
  }
}
    ${ContactPartsFragmentDoc}`;
export const FranchiseDocument = gql`
    query franchise($relativePath: String!) {
  franchise(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FranchiseParts
  }
}
    ${FranchisePartsFragmentDoc}`;
export const FranchiseConnectionDocument = gql`
    query franchiseConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FranchiseFilter) {
  franchiseConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FranchiseParts
      }
    }
  }
}
    ${FranchisePartsFragmentDoc}`;
export const MembershipDocument = gql`
    query membership($relativePath: String!) {
  membership(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...MembershipParts
  }
}
    ${MembershipPartsFragmentDoc}`;
export const MembershipConnectionDocument = gql`
    query membershipConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: MembershipFilter) {
  membershipConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...MembershipParts
      }
    }
  }
}
    ${MembershipPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    home(variables, options) {
      return requester(HomeDocument, variables, options);
    },
    homeConnection(variables, options) {
      return requester(HomeConnectionDocument, variables, options);
    },
    about(variables, options) {
      return requester(AboutDocument, variables, options);
    },
    aboutConnection(variables, options) {
      return requester(AboutConnectionDocument, variables, options);
    },
    services(variables, options) {
      return requester(ServicesDocument, variables, options);
    },
    servicesConnection(variables, options) {
      return requester(ServicesConnectionDocument, variables, options);
    },
    gallery(variables, options) {
      return requester(GalleryDocument, variables, options);
    },
    galleryConnection(variables, options) {
      return requester(GalleryConnectionDocument, variables, options);
    },
    testimonials(variables, options) {
      return requester(TestimonialsDocument, variables, options);
    },
    testimonialsConnection(variables, options) {
      return requester(TestimonialsConnectionDocument, variables, options);
    },
    careers(variables, options) {
      return requester(CareersDocument, variables, options);
    },
    careersConnection(variables, options) {
      return requester(CareersConnectionDocument, variables, options);
    },
    contact(variables, options) {
      return requester(ContactDocument, variables, options);
    },
    contactConnection(variables, options) {
      return requester(ContactConnectionDocument, variables, options);
    },
    franchise(variables, options) {
      return requester(FranchiseDocument, variables, options);
    },
    franchiseConnection(variables, options) {
      return requester(FranchiseConnectionDocument, variables, options);
    },
    membership(variables, options) {
      return requester(MembershipDocument, variables, options);
    },
    membershipConnection(variables, options) {
      return requester(MembershipConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "http://localhost:4001/graphql",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
