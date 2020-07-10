import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_category' })
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public category_name!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
