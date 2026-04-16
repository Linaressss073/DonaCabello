import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAILTRAP_HOST'),
      port: this.configService.get<number>('MAILTRAP_PORT'),
      auth: {
        user: this.configService.get<string>('MAILTRAP_USER'),
        pass: this.configService.get<string>('MAILTRAP_PASS'),
      },
    });
  }

  async sendPasswordReset(opts: { to: string; name: string; resetUrl: string }): Promise<void> {
    const from = this.configService.get<string>('MAILTRAP_FROM') ?? 'noreply@donacabello.com';
    try {
      await this.transporter.sendMail({
        from,
        to: opts.to,
        subject: 'Restablece tu contraseña — DonaCabello',
        html: `
          <h2>Hola ${opts.name},</h2>
          <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en DonaCabello.</p>
          <p>Haz clic en el siguiente enlace para crear una nueva contraseña. Este enlace expira en <strong>1 hora</strong>:</p>
          <p style="margin: 24px 0;">
            <a href="${opts.resetUrl}" style="background:#e11d48;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Restablecer contraseña
            </a>
          </p>
          <p style="color:#888;font-size:12px;">Si no solicitaste este cambio, ignora este correo. Tu contraseña no cambiará.</p>
          <br/>
          <p>El equipo de <strong>DonaCabello</strong></p>
        `,
      });
    } catch (err) {
      this.logger.warn('No se pudo enviar email de reset: ' + err.message);
    }
  }

  async sendContactNotification(opts: {
    name: string;
    email: string;
    message: string;
  }): Promise<void> {
    const from = this.configService.get<string>('MAILTRAP_FROM') ?? 'noreply@donacabello.com';

    try {
      await this.transporter.sendMail({
        from,
        to: from,
        subject: `[DonaCabello] Mensaje de contacto de ${opts.name}`,
        html: `
          <h2>Nuevo mensaje de contacto</h2>
          <p><strong>Nombre:</strong> ${opts.name}</p>
          <p><strong>Email:</strong> ${opts.email}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${opts.message}</p>
        `,
      });

      await this.transporter.sendMail({
        from,
        to: opts.email,
        subject: 'Recibimos tu mensaje — DonaCabello',
        html: `
          <h2>¡Hola ${opts.name}!</h2>
          <p>Recibimos tu mensaje correctamente. Nos pondremos en contacto contigo pronto.</p>
          <br/>
          <p>El equipo de <strong>DonaCabello</strong></p>
        `,
      });
    } catch (err) {
      this.logger.warn('No se pudo enviar el email (verifica credenciales de Mailtrap): ' + err.message);
    }
  }
}
