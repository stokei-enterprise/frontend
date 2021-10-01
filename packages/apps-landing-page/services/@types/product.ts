import { AppModel } from './app';
import { CourseModel } from './course';

export interface ProductModel {
  readonly id: string;
  readonly app?: AppModel;
  readonly course?: CourseModel;
  readonly name?: string;
  readonly images?: string[];
  readonly categoryId: string;
  readonly parent?: string;
  readonly parentType?: string;
  readonly reference?: string;
  readonly referenceType?: string;
  readonly type?: string;
  readonly status?: string;
  readonly priority?: number;
  readonly maxQuantityPerPurchase?: number;
  readonly currency: string;
  readonly tangible?: boolean;
  readonly canceledAt?: string;
  readonly updatedAt?: string;
  readonly createdAt: string;
  readonly attributes?: string[];
}
