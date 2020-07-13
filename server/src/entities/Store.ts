import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity({ name: 'tb_store' })
export class Store extends BaseEntity {
  @PrimaryGeneratedColumn()
  public seq!: number;

  @Column()
  public store_name!: string;

  @Column()
  public store_phone_number!: string;

  @Column()
  public store_location!: string;

  @Column()
  public category_seq!: number;

  @Column()
  public logo_img!: string;

  @Column()
  public rating!: number;

  @Column()
  public order_count!: number;

  @Column()
  public dib_count!: number;

  @Column()
  public order_tip!: number;

  @Column()
  public order_time!: number;

  @Column()
  public order_price!: number;

  @Column()
  public description!: string;

  @Column()
  public notice!: string;

  public readonly reg_dt!: Date;
  public readonly upd_dt!: Date;
}
