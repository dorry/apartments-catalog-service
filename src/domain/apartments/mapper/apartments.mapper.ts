import { GetApartmentDetailsDto } from '../dto/get-apartment-details.dto';
import { Apartment } from '../entities/apartments.schema';

export default class ApartmentsMapper {
  apartmentDocumentToApartmentDto(
    apartmentDocument: Apartment,
  ): GetApartmentDetailsDto {
    return {
      id: apartmentDocument._id.toJSON(),
      name: apartmentDocument.name,
      number: apartmentDocument.number,
      size: apartmentDocument.size,
      project: apartmentDocument.project,
      description: apartmentDocument.description,
      price: apartmentDocument.price,
      images: apartmentDocument.images,
      address: apartmentDocument.address,
    };
  }
}
