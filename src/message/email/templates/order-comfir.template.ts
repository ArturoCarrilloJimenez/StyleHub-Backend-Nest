export const emailInvoiceTemplate = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8" /></head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:Helvetica,Arial,sans-serif;color:#333333;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#eef2f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.05);">
          
          <!-- Cabecera -->
          <tr>
            <td style="background-color:#1e293b;padding:24px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:400;">StyleHub</h1>
            </td>
          </tr>

          <!-- Introducción -->
          <tr>
            <td style="padding:32px;">
              <h2 style="margin:0 0 16px;color:#1e293b;font-size:22px;font-weight:500;">
                Factura de tu pedido Nº \${order_number}
              </h2>
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;">
                ¡Hola \${user_name}! Gracias por tu compra realizada el \${order_date}.
              </p>

              <!-- Cards de Productos -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:24px;">
                <tr>
                  <td>
                    <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                      \${items}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Total -->
              <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#4b5563;text-align:right;font-weight:500;">
                Total: \${total_amount}
              </p>

              <p style="margin:0;font-size:16px;line-height:1.6;color:#4b5563;">
                Para cualquier consulta, responde a este correo. Gracias por elegir StyleHub.
              </p>
            </td>
          </tr>

          <!-- Divisor -->
          <tr>
            <td style="padding:0 32px;">
              <hr style="border:none;border-top:1px solid #e5e7eb;" />
            </td>
          </tr>

          <!-- Pie de página -->
          <tr>
            <td style="padding:24px 32px;background-color:#f9fafb;text-align:center;">
              <p style="margin:0;font-size:14px;line-height:1.5;color:#6b7280;">
                StyleHub • E-commerce<br/>
                Innovation Avenue, 123, Madrid, España
              </p>
              <p style="margin:8px 0 0;font-size:14px;line-height:1.5;color:#6b7280;">
                © 2025 StyleHub. Todos los derechos reservados.<br/>
                <a href="\${link_front}" target="_blank" style="color:#3b82f6;text-decoration:none;font-weight:500;">\${link_front}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const emailInvoiceItemTemplate = `
<tr>
<td style="padding:12px;">
    <table cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
    <tr>
        <!-- Imagen -->
        <td width="120" style="background-color:#ffffff;">
        <img src="\${item.image_url}" alt="\${item.name}" width="120" style="display:block;border:none;outline:none;text-decoration:none;">
        </td>
        <!-- Detalles -->
        <td style="padding:12px;background-color:#ffffff;vertical-align:top;">
        <h3 style="margin:0 0 8px;color:#1e293b;font-size:18px;font-weight:500;">\${item.name}</h3>
        <p style="margin:0 0 4px;font-size:14px;color:#4b5563;">Cantidad: \${item.quantity}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#4b5563;">Precio unitario: \${item.unit_price}</p>
        <p style="margin:0;font-size:14px;font-weight:500;color:#1e293b;">Subtotal: \${item.subtotal}</p>
        </td>
    </tr>
    </table>
</td>
</tr>
`;
