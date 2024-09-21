import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Organization } from './organization.entity';

@Entity()
export class Subscriber {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @ManyToOne(() => Organization, (organization) => organization.id, {eager: true})
    organization: Organization;

    @Column('jsonb', { nullable: true })
    custom_fields: Record<string, any>;

    @Column({ type: 'text', nullable: true })
    gpg_public_key: string;

    @CreateDateColumn()
    created_at: Date;
}
