import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class List {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => Organization, (organization) => organization.id, {eager: true})
    organization: Organization;

    @Column('jsonb', { nullable: true })
    custom_fields: Record<string, any>;

    @CreateDateColumn()
    created_at: Date;
}
