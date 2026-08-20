import servicesData from '../content/services.json';

export const serviceCatalog = servicesData.catalog;

export const slugifyServiceItem = (value) => value
  .toLowerCase()
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

export const findServiceBySlug = (slug) => serviceCatalog.find((service) => service.slug === slug);

export const findServiceItemBySlug = (service, itemSlug) => service?.items.find((item) => slugifyServiceItem(item) === itemSlug);
